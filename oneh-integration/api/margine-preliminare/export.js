/**
 * API Serverless — Esportazione ordini margine preliminare in CSV
 * Endpoint: POST /api/margine-preliminare/export
 *
 * Body: { format: 'csv'|'xlsx', filters: {...}, includeShipments: boolean }
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { format = 'csv', filters = {}, includeShipments = true } = req.body

    // Fetch ordini
    let query = supabase.from('mp_orders').select('*')

    if (filters.dateFrom) query = query.gte('order_date', filters.dateFrom)
    if (filters.dateTo) query = query.lte('order_date', filters.dateTo)
    if (filters.supplier) query = query.eq('supplier', filters.supplier)
    if (filters.warehouse) query = query.eq('warehouse', filters.warehouse)
    if (filters.courier) query = query.eq('courier', filters.courier)
    if (filters.productCostStatus === 'ok') query = query.eq('has_valid_product_costs', true)
    if (filters.productCostStatus === 'ko') query = query.eq('has_valid_product_costs', false)
    if (filters.shippingCostStatus === 'ok') query = query.eq('has_valid_shipping_costs', true)
    if (filters.shippingCostStatus === 'ko') query = query.eq('has_valid_shipping_costs', false)

    query = query.order('order_date', { ascending: false })

    const { data: orders, error } = await query
    if (error) throw error

    // Fetch spedizioni se richiesto
    let shipments = []
    if (includeShipments && orders.length > 0) {
      const orderIds = orders.map((o) => o.id)
      const { data: shipmentsData, error: shipErr } = await supabase
        .from('mp_shipments')
        .select('*')
        .in('order_id', orderIds)
      if (shipErr) throw shipErr
      shipments = shipmentsData || []
    }

    // Genera CSV
    const headers = [
      'Tipo', 'ID Ordine', 'Marketplace', 'Cliente', 'Data Ordine',
      'Fornitore', 'Magazzino', 'Corriere', 'Tracking',
      'Val. Prodotto', 'Val. Spedizione', 'Sconti', 'Tot. Incassato',
      'Costo Prod.', 'Costo Sped.', 'Commissioni', 'Tot. Costi',
      'Margine', 'Margine %', 'Costo Prod. OK', 'Costo Sped. OK',
    ]

    const rows = []
    for (const order of orders) {
      rows.push([
        'Ordine',
        order.id,
        order.marketplace,
        order.customer_name,
        order.order_date?.split('T')[0] || '',
        order.supplier || '',
        order.warehouse || '',
        order.courier || '',
        '',
        order.product_value,
        order.shipping_value,
        order.discounts,
        order.revenue_total,
        order.product_cost,
        order.shipping_cost,
        order.commissions,
        order.costs_total,
        order.margin_value,
        order.margin_percentage,
        order.has_valid_product_costs ? 'OK' : 'KO',
        order.has_valid_shipping_costs ? 'OK' : 'KO',
      ])

      if (includeShipments) {
        const orderShipments = shipments.filter((s) => s.order_id === order.id)
        for (const s of orderShipments) {
          rows.push([
            'Spedizione',
            s.id,
            s.marketplace,
            s.customer_name,
            '',
            '',
            '',
            '',
            s.tracking_number || '',
            s.product_value,
            s.shipping_value,
            s.discounts,
            s.revenue_total,
            s.product_cost,
            s.shipping_cost,
            s.commissions,
            s.costs_total,
            s.margin_value,
            s.margin_percentage,
            s.has_valid_product_cost ? 'OK' : 'KO',
            s.has_valid_shipping_cost ? 'OK' : 'KO',
          ])
        }
      }
    }

    const escapeCsv = (val) => {
      const str = String(val ?? '')
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map(escapeCsv).join(',')),
    ].join('\n')

    const dateRange = filters.dateFrom && filters.dateTo
      ? `${filters.dateFrom}_${filters.dateTo}`
      : new Date().toISOString().split('T')[0]

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="ordini-margine_${dateRange}.csv"`)
    res.status(200).send('\uFEFF' + csv) // BOM per Excel
  } catch (err) {
    console.error('Export error:', err)
    res.status(500).json({ error: err.message || 'Errore durante l\'esportazione' })
  }
}

export const config = { maxDuration: 60 }

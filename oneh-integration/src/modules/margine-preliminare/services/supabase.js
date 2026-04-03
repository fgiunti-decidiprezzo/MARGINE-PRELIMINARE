/**
 * Servizio Supabase — query ordini e spedizioni per Margine Preliminare
 *
 * Usa il client Supabase locale al modulo (pattern occasioni/lib/supabase.js).
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Applica i filtri alla query ordini
 */
function applyFilters(query, filters) {
  if (filters.searchQuery) {
    const search = `%${filters.searchQuery}%`
    query = query.or(`id.ilike.${search},customer_name.ilike.${search}`)
  }
  if (filters.dateFrom) {
    query = query.gte('order_date', filters.dateFrom)
  }
  if (filters.dateTo) {
    query = query.lte('order_date', filters.dateTo)
  }
  if (filters.supplier) {
    query = query.eq('supplier', filters.supplier)
  }
  if (filters.fulfillmentDate) {
    query = query.eq('fulfillment_date', filters.fulfillmentDate)
  }
  if (filters.warehouse) {
    query = query.eq('warehouse', filters.warehouse)
  }
  if (filters.courier) {
    query = query.eq('courier', filters.courier)
  }
  if (filters.productCostStatus === 'ok') {
    query = query.eq('has_valid_product_costs', true)
  } else if (filters.productCostStatus === 'ko') {
    query = query.eq('has_valid_product_costs', false)
  }
  if (filters.shippingCostStatus === 'ok') {
    query = query.eq('has_valid_shipping_costs', true)
  } else if (filters.shippingCostStatus === 'ko') {
    query = query.eq('has_valid_shipping_costs', false)
  }
  return query
}

/**
 * Recupera ordini con filtri, paginazione e spedizioni associate
 */
export async function fetchOrders(filters = {}, page = 1, pageSize = 50) {
  // Query ordini con conteggio
  let ordersQuery = supabase
    .from('mp_orders')
    .select('*', { count: 'exact' })

  ordersQuery = applyFilters(ordersQuery, filters)

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  ordersQuery = ordersQuery.range(from, to).order('order_date', { ascending: false })

  const { data: ordersData, error: ordersError, count } = await ordersQuery
  if (ordersError) throw new Error(ordersError.message)
  if (!ordersData || ordersData.length === 0) {
    return {
      orders: [],
      statistics: emptyStats(),
      pagination: { total: 0, page, pageSize, totalPages: 0 },
    }
  }

  // Fetch spedizioni per gli ordini trovati
  const orderIds = ordersData.map((o) => o.id)
  const { data: shipmentsData, error: shipmentsError } = await supabase
    .from('mp_shipments')
    .select('*')
    .in('order_id', orderIds)

  if (shipmentsError) throw new Error(shipmentsError.message)

  // Associa spedizioni agli ordini
  const orders = ordersData.map((order) => ({
    ...order,
    shipments: (shipmentsData || []).filter((s) => s.order_id === order.id),
  }))

  // Calcola statistiche (su TUTTI gli ordini filtrati, non solo la pagina)
  const statistics = await calculateStatistics(filters)

  return {
    orders,
    statistics,
    pagination: {
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    },
  }
}

/**
 * Calcola statistiche aggregate sugli ordini filtrati
 */
async function calculateStatistics(filters = {}) {
  let query = supabase.from('mp_orders').select('margin_value, margin_percentage, revenue_total, costs_total')
  query = applyFilters(query, filters)

  const { data, error } = await query
  if (error) throw new Error(error.message)
  if (!data || data.length === 0) return emptyStats()

  const totalOrders = data.length
  const profitableOrders = data.filter((o) => parseFloat(o.margin_value) > 0).length
  const losingOrders = data.filter((o) => parseFloat(o.margin_value) < 0).length
  const totalMargin = data.reduce((sum, o) => sum + parseFloat(o.margin_value), 0)
  const totalRevenue = data.reduce((sum, o) => sum + parseFloat(o.revenue_total), 0)
  const totalCosts = data.reduce((sum, o) => sum + parseFloat(o.costs_total), 0)
  const avgMargin = totalOrders > 0
    ? data.reduce((sum, o) => sum + parseFloat(o.margin_percentage), 0) / totalOrders
    : 0

  return {
    totalOrders,
    profitableOrders,
    profitablePercentage: totalOrders > 0 ? (profitableOrders / totalOrders) * 100 : 0,
    losingOrders,
    losingPercentage: totalOrders > 0 ? (losingOrders / totalOrders) * 100 : 0,
    totalMargin,
    totalRevenue,
    totalCosts,
    averageMarginPercentage: avgMargin,
  }
}

/**
 * Recupera opzioni filtri (valori distinti)
 */
export async function fetchFilterOptions() {
  const { data, error } = await supabase
    .from('mp_orders')
    .select('supplier, warehouse, courier, marketplace')

  if (error) throw new Error(error.message)
  if (!data) return { suppliers: [], warehouses: [], couriers: [], marketplaces: [] }

  return {
    suppliers: [...new Set(data.map((o) => o.supplier).filter(Boolean))].sort(),
    warehouses: [...new Set(data.map((o) => o.warehouse).filter(Boolean))].sort(),
    couriers: [...new Set(data.map((o) => o.courier).filter(Boolean))].sort(),
    marketplaces: [...new Set(data.map((o) => o.marketplace).filter(Boolean))].sort(),
  }
}

function emptyStats() {
  return {
    totalOrders: 0,
    profitableOrders: 0,
    profitablePercentage: 0,
    losingOrders: 0,
    losingPercentage: 0,
    totalMargin: 0,
    totalRevenue: 0,
    totalCosts: 0,
    averageMarginPercentage: 0,
  }
}

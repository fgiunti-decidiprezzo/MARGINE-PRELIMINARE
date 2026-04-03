/**
 * Tabella ordini con vista gerarchica ordini/spedizioni — Margine Preliminare
 */

import { useState } from 'react'
import { formatCurrency, formatPercentage, formatDateSimple, getMarginStatus } from '../services/calculations'

function ShipmentRow({ shipment }) {
  const marginStatus = getMarginStatus(shipment.margin_value)
  const marginColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
  }[marginStatus]

  const costTag = (isValid) =>
    isValid
      ? 'inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-700'
      : 'inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-700'

  return (
    <tr className="bg-white text-[13px] hover:bg-gray-50">
      <td className="pl-10 pr-3 py-3 border-b border-gray-200 border-l-4 border-l-gray-200" />
      <td className="px-3 py-3 border-b border-gray-200">{shipment.id}</td>
      <td className="px-3 py-3 border-b border-gray-200">{shipment.marketplace}</td>
      <td className="px-3 py-3 border-b border-gray-200">{shipment.customer_name}</td>
      <td className="px-3 py-3 border-b border-gray-200">{shipment.tracking_number || '-'}</td>
      <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(shipment.product_value)}</td>
      <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(shipment.shipping_value)}</td>
      <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(shipment.discounts)}</td>
      <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(shipment.revenue_total)}</td>
      <td className="px-3 py-3 border-b border-gray-200">
        <span className={costTag(shipment.has_valid_product_cost)}>
          {formatCurrency(shipment.product_cost)}
        </span>
      </td>
      <td className="px-3 py-3 border-b border-gray-200">
        <span className={costTag(shipment.has_valid_shipping_cost)}>
          {formatCurrency(shipment.shipping_cost)}
        </span>
      </td>
      <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(shipment.commissions)}</td>
      <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(shipment.costs_total)}</td>
      <td className={`px-3 py-3 border-b border-gray-200 font-semibold ${marginColor}`}>
        {shipment.margin_value >= 0 ? '+' : ''}
        {formatCurrency(shipment.margin_value)} ({formatPercentage(shipment.margin_percentage)})
      </td>
    </tr>
  )
}

function OrderRow({ order, isExpanded, onToggle }) {
  const marginStatus = getMarginStatus(order.margin_value)
  const marginColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
  }[marginStatus]

  const costTag = (isValid) =>
    isValid
      ? 'inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-700'
      : 'inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-700'

  const hasShipments = order.shipments && order.shipments.length > 0

  return (
    <>
      <tr className="bg-gray-50 font-semibold hover:bg-gray-100">
        <td className="px-3 py-3 border-b border-gray-200 border-l-4 border-l-blue-500">
          {hasShipments && (
            <span
              className="cursor-pointer inline-block w-5 text-center text-gray-500 text-[11px] select-none hover:text-blue-600"
              onClick={onToggle}
            >
              {isExpanded ? '▼' : '►'}
            </span>
          )}
        </td>
        <td className="px-3 py-3 border-b border-gray-200">
          <strong>{order.id}</strong>
          <div className="text-[10px] text-gray-400 font-normal mt-0.5">
            {formatDateSimple(order.order_date)}
          </div>
        </td>
        <td className="px-3 py-3 border-b border-gray-200">{order.marketplace}</td>
        <td className="px-3 py-3 border-b border-gray-200">{order.customer_name}</td>
        <td className="px-3 py-3 border-b border-gray-200">-</td>
        <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(order.product_value)}</td>
        <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(order.shipping_value)}</td>
        <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(order.discounts)}</td>
        <td className="px-3 py-3 border-b border-gray-200">
          <strong>{formatCurrency(order.revenue_total)}</strong>
        </td>
        <td className="px-3 py-3 border-b border-gray-200">
          <span className={costTag(order.has_valid_product_costs)}>
            {formatCurrency(order.product_cost)}
          </span>
        </td>
        <td className="px-3 py-3 border-b border-gray-200">
          <span className={costTag(order.has_valid_shipping_costs)}>
            {formatCurrency(order.shipping_cost)}
          </span>
        </td>
        <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(order.commissions)}</td>
        <td className="px-3 py-3 border-b border-gray-200">{formatCurrency(order.costs_total)}</td>
        <td className={`px-3 py-3 border-b border-gray-200 ${marginColor}`}>
          <strong>
            {order.margin_value >= 0 ? '+' : ''}
            {formatCurrency(order.margin_value)} ({formatPercentage(order.margin_percentage)})
          </strong>
        </td>
      </tr>

      {isExpanded &&
        order.shipments?.map((shipment) => (
          <ShipmentRow key={shipment.id} shipment={shipment} />
        ))}
    </>
  )
}

export default function OrderTable({ orders, isLoading = false }) {
  const [expandedOrders, setExpandedOrders] = useState(new Set())

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev)
      if (next.has(orderId)) {
        next.delete(orderId)
      } else {
        next.add(orderId)
      }
      return next
    })
  }

  const expandAll = () => setExpandedOrders(new Set(orders.map((o) => o.id)))
  const collapseAll = () => setExpandedOrders(new Set())

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center text-gray-500">
        Caricamento in corso...
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center text-gray-500">
        Nessun ordine trovato
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Azioni tabella */}
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex gap-2">
        <button
          onClick={expandAll}
          className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded text-[11px] font-semibold hover:bg-gray-50 transition-colors"
        >
          Espandi tutti
        </button>
        <button
          onClick={collapseAll}
          className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded text-[11px] font-semibold hover:bg-gray-50 transition-colors"
        >
          Collassa tutti
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 w-8" />
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">ID Ordine</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Marketplace</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Cliente</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Tracking</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Val. Prodotto</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Val. Sped.</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Sconti</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Tot. Incassato</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Costo Prod.</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Costo Sped.</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Commissioni</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Tot. Costi</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-200 text-[11px] uppercase text-gray-700 whitespace-nowrap">Margine</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                isExpanded={expandedOrders.has(order.id)}
                onToggle={() => toggleOrder(order.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

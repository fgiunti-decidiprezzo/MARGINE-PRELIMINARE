/**
 * Statistiche aggregate — Margine Preliminare
 */

import { formatCurrency, formatPercentage } from '../services/calculations'

function StatBox({ label, value, type = 'neutral', isLoading }) {
  const borderColor = {
    positive: 'border-l-green-500',
    negative: 'border-l-red-500',
    neutral: 'border-l-gray-400',
  }[type]

  const valueColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-900',
  }[type]

  return (
    <div className={`bg-white p-3 rounded border border-gray-200 border-l-[3px] ${borderColor} hover:-translate-y-0.5 hover:shadow-sm transition-all`}>
      <div className="text-[11px] text-gray-500 mb-1 font-semibold uppercase">{label}</div>
      <div className={`text-lg font-semibold ${valueColor}`}>
        {isLoading ? '...' : value}
      </div>
    </div>
  )
}

export default function Statistics({ statistics, isLoading = false }) {
  const {
    totalOrders = 0,
    profitableOrders = 0,
    profitablePercentage = 0,
    losingOrders = 0,
    losingPercentage = 0,
    totalMargin = 0,
    totalRevenue = 0,
  } = statistics || {}

  const marginType = totalMargin > 0 ? 'positive' : totalMargin < 0 ? 'negative' : 'neutral'

  return (
    <div className="flex-1 min-w-[280px]">
      <h3 className="text-xs font-semibold text-gray-600 uppercase mb-3">Riepilogo</h3>
      <div className="grid grid-cols-2 gap-2.5">
        <StatBox
          label="Ordini Totali"
          value={totalOrders}
          type="neutral"
          isLoading={isLoading}
        />
        <StatBox
          label="In Profitto"
          value={`${profitableOrders} (${formatPercentage(profitablePercentage, 0)})`}
          type="positive"
          isLoading={isLoading}
        />
        <StatBox
          label="In Perdita"
          value={`${losingOrders} (${formatPercentage(losingPercentage, 0)})`}
          type="negative"
          isLoading={isLoading}
        />
        <StatBox
          label="Margine Totale"
          value={`${totalMargin >= 0 ? '+' : ''}${formatCurrency(totalMargin)}`}
          type={marginType}
          isLoading={isLoading}
        />
        <StatBox
          label="Valore Ordini"
          value={formatCurrency(totalRevenue)}
          type="neutral"
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

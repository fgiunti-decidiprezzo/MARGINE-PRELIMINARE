/**
 * Filtri di ricerca ordini — Margine Preliminare
 */

import { useState, useEffect } from 'react'

function getCurrentMonthRange() {
  const now = new Date()
  const first = new Date(now.getFullYear(), now.getMonth(), 1)
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const pad = (n) => String(n).padStart(2, '0')
  return {
    from: `${first.getFullYear()}-${pad(first.getMonth() + 1)}-${pad(first.getDate())}`,
    to: `${last.getFullYear()}-${pad(last.getMonth() + 1)}-${pad(last.getDate())}`,
  }
}

export default function Filters({ filters, options, optionsLoading, onFiltersChange, onReset, onExport }) {
  const [local, setLocal] = useState(filters)

  useEffect(() => {
    setLocal(filters)
  }, [filters])

  const update = (key, value) => {
    setLocal((prev) => ({ ...prev, [key]: value || undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFiltersChange(local)
  }

  const setCurrentMonth = () => {
    const range = getCurrentMonthRange()
    setLocal((prev) => ({ ...prev, dateFrom: range.from, dateTo: range.to }))
  }

  return (
    <div className="flex-[2] min-w-0">
      {/* Header filtri */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-semibold text-gray-600 uppercase">Filtri</h3>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold border border-gray-300 hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
          {onExport && (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onExport('csv')}
                className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 transition-colors"
              >
                CSV
              </button>
              <button
                type="button"
                onClick={() => onExport('xlsx')}
                className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 transition-colors"
              >
                Excel
              </button>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Ricerca */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Ricerca</label>
            <input
              type="text"
              placeholder="Ordine, cliente, tracking..."
              value={local.searchQuery || ''}
              onChange={(e) => update('searchQuery', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Data Da */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Data Da</label>
            <input
              type="date"
              value={local.dateFrom || ''}
              onChange={(e) => update('dateFrom', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Data A */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Data A</label>
            <div className="flex gap-1">
              <input
                type="date"
                value={local.dateTo || ''}
                onChange={(e) => update('dateTo', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={setCurrentMonth}
                className="px-2 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs font-semibold whitespace-nowrap hover:bg-gray-200 transition-colors"
              >
                Mese
              </button>
            </div>
          </div>

          {/* Fornitore */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Fornitore</label>
            <select
              value={local.supplier || ''}
              onChange={(e) => update('supplier', e.target.value)}
              disabled={optionsLoading}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="">Tutti</option>
              {options.suppliers.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Data Evasione */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Data Evasione</label>
            <input
              type="date"
              value={local.fulfillmentDate || ''}
              onChange={(e) => update('fulfillmentDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Logistica */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Logistica</label>
            <select
              value={local.warehouse || ''}
              onChange={(e) => update('warehouse', e.target.value)}
              disabled={optionsLoading}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="">Tutti</option>
              {options.warehouses.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          {/* Corriere */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Corriere</label>
            <select
              value={local.courier || ''}
              onChange={(e) => update('courier', e.target.value)}
              disabled={optionsLoading}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="">Tutti</option>
              {options.couriers.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Costo Prodotto */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Costo Prodotto</label>
            <select
              value={local.productCostStatus || ''}
              onChange={(e) => update('productCostStatus', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Tutti</option>
              <option value="ok">OK</option>
              <option value="ko">KO</option>
            </select>
          </div>

          {/* Costo Spedizione */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Costo Spedizione</label>
            <select
              value={local.shippingCostStatus || ''}
              onChange={(e) => update('shippingCostStatus', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Tutti</option>
              <option value="ok">OK</option>
              <option value="ko">KO</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Cerca
        </button>
      </form>
    </div>
  )
}

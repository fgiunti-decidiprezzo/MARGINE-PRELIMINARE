/**
 * Margine Preliminare — App principale
 * Analisi margine operativo lordo preliminare ordini
 *
 * Visibile a tutti, modificabile solo da Gaetano Simonetti (level: full)
 */

import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { usePermissions } from '../../auth/usePermissions'
import Filters from './components/Filters'
import Statistics from './components/Statistics'
import OrderTable from './components/OrderTable'
import { useOrders } from './hooks/useOrders'
import { useFilterOptions } from './hooks/useFilterOptions'
import { useExport } from './hooks/useExport'

export default function MarginePreliminareApp() {
  const { user } = useAuth()
  const { hasPermission } = usePermissions()
  const canEdit = hasPermission('margine-preliminare', 'full')

  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)
  const pageSize = 50

  const { orders, statistics, pagination, isLoading, error, refetch } = useOrders(filters, page, pageSize)
  const { options, isLoading: optionsLoading } = useFilterOptions()
  const { exportCsv, exportExcel, isExporting } = useExport()

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleReset = () => {
    setFilters({})
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExport = async (format) => {
    try {
      if (format === 'csv') {
        await exportCsv(filters)
      } else {
        await exportExcel(filters)
      }
    } catch (err) {
      console.error('Export error:', err)
    }
  }

  return (
    <div className="max-w-[1800px] mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Analisi Margine Operativo Lordo Preliminare
        </h1>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filtri */}
          <Filters
            filters={filters}
            options={options}
            optionsLoading={optionsLoading}
            onFiltersChange={handleFiltersChange}
            onReset={handleReset}
            onExport={canEdit && !isExporting ? handleExport : null}
          />

          {/* Statistiche */}
          <Statistics statistics={statistics} isLoading={isLoading} />
        </div>
      </div>

      {/* Errore */}
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm">
          <strong>Errore:</strong> {error}
        </div>
      )}

      {/* Tabella */}
      <OrderTable orders={orders} isLoading={isLoading} />

      {/* Paginazione */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-5 p-4 bg-white rounded-lg border border-gray-200">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-700 transition-colors"
          >
            ← Precedente
          </button>
          <span className="text-sm text-gray-600 font-semibold">
            Pagina {page} di {pagination.totalPages} ({pagination.total} ordini)
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-700 transition-colors"
          >
            Successiva →
          </button>
        </div>
      )}

      {/* Export overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-base font-semibold text-gray-900">Esportazione in corso...</p>
          </div>
        </div>
      )}
    </div>
  )
}

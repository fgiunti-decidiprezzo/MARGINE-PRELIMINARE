/**
 * Hook — esportazione dati in CSV / Excel
 * Chiama l'endpoint serverless /api/margine-preliminare/export
 */

import { useState, useCallback } from 'react'

function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

function generateFilename(format, filters) {
  const date = new Date().toISOString().split('T')[0]
  const range = filters?.dateFrom && filters?.dateTo
    ? `_${filters.dateFrom}_${filters.dateTo}`
    : `_${date}`
  return `ordini-margine${range}.${format}`
}

export function useExport() {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState(null)

  const doExport = useCallback(async (format, filters = {}) => {
    setIsExporting(true)
    setError(null)
    try {
      const res = await fetch('/api/margine-preliminare/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, filters, includeShipments: true }),
      })
      if (!res.ok) throw new Error('Errore durante l\'esportazione')
      const blob = await res.blob()
      downloadBlob(blob, generateFilename(format, filters))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsExporting(false)
    }
  }, [])

  const exportCsv = useCallback((filters) => doExport('csv', filters), [doExport])
  const exportExcel = useCallback((filters) => doExport('xlsx', filters), [doExport])

  return { exportCsv, exportExcel, isExporting, error }
}

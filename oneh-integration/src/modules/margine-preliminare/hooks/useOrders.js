/**
 * Hook — caricamento ordini con filtri e paginazione
 */

import { useState, useEffect, useCallback } from 'react'
import { fetchOrders } from '../services/supabase'

export function useOrders(filters = {}, page = 1, pageSize = 50) {
  const [orders, setOrders] = useState([])
  const [statistics, setStatistics] = useState({})
  const [pagination, setPagination] = useState({ total: 0, page: 1, pageSize, totalPages: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchOrders(filters, page, pageSize)
      setOrders(result.orders)
      setStatistics(result.statistics)
      setPagination(result.pagination)
    } catch (err) {
      setError(err.message || 'Errore nel caricamento degli ordini')
      console.error('useOrders error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [JSON.stringify(filters), page, pageSize])

  useEffect(() => {
    load()
  }, [load])

  return { orders, statistics, pagination, isLoading, error, refetch: load }
}

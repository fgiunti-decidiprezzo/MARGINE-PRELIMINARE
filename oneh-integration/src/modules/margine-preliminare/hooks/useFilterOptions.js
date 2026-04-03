/**
 * Hook — opzioni disponibili per i filtri
 */

import { useState, useEffect } from 'react'
import { fetchFilterOptions } from '../services/supabase'

export function useFilterOptions() {
  const [options, setOptions] = useState({
    suppliers: [],
    warehouses: [],
    couriers: [],
    marketplaces: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setIsLoading(true)
      try {
        const data = await fetchFilterOptions()
        if (!cancelled) setOptions(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { options, isLoading, error }
}

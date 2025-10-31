/**
 * Hook per caricare le opzioni dei filtri
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { FilterOptions, LoadingState } from '@/types/order.types';

interface UseFilterOptionsResult extends LoadingState {
  /** Opzioni disponibili per i filtri */
  options: FilterOptions;
  /** Funzione per ricaricare le opzioni */
  refetch: () => Promise<void>;
}

/**
 * Hook per caricare le opzioni disponibili per i filtri
 * (fornitori, magazzini, corrieri, marketplace)
 */
export function useFilterOptions(): UseFilterOptionsResult {
  const [options, setOptions] = useState<FilterOptions>({
    suppliers: [],
    warehouses: [],
    couriers: [],
    marketplaces: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOptions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiService.getFilterOptions();
      setOptions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento delle opzioni');
      console.error('Error fetching filter options:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return {
    options,
    isLoading,
    error,
    refetch: fetchOptions,
  };
}

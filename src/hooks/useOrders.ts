/**
 * Hook per gestire il caricamento degli ordini
 */

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api.service';
import type {
  Order,
  OrderFilters,
  OrdersResponse,
  PaginationParams,
  LoadingState,
} from '@/types/order.types';

interface UseOrdersResult extends LoadingState {
  /** Lista degli ordini */
  orders: Order[];
  /** Statistiche aggregate */
  statistics: OrdersResponse['statistics'];
  /** Informazioni di paginazione */
  pagination: OrdersResponse['pagination'];
  /** Funzione per ricaricare i dati */
  refetch: () => Promise<void>;
  /** Funzione per cambiare pagina */
  setPage: (page: number) => void;
  /** Funzione per aggiornare i filtri */
  setFilters: (filters: OrderFilters) => void;
}

/**
 * Hook per caricare e gestire gli ordini con filtri e paginazione
 */
export function useOrders(
  initialFilters: OrderFilters = {},
  initialPagination: PaginationParams = { page: 1, pageSize: 50 }
): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statistics, setStatistics] = useState<OrdersResponse['statistics']>({
    totalOrders: 0,
    profitableOrders: 0,
    profitablePercentage: 0,
    losingOrders: 0,
    losingPercentage: 0,
    totalMargin: 0,
    totalRevenue: 0,
    totalCosts: 0,
    averageMarginPercentage: 0,
  });
  const [pagination, setPagination] = useState<OrdersResponse['pagination']>({
    total: 0,
    page: initialPagination.page,
    pageSize: initialPagination.pageSize,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<OrderFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carica gli ordini dal backend
   */
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.getOrders(filters, {
        page: pagination.page,
        pageSize: pagination.pageSize,
      });

      setOrders(response.orders);
      setStatistics(response.statistics);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento degli ordini');
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  /**
   * Effettua il fetch iniziale e quando cambiano filtri o paginazione
   */
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /**
   * Cambia pagina
   */
  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  /**
   * Aggiorna i filtri e resetta alla prima pagina
   */
  const updateFilters = useCallback((newFilters: OrderFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  return {
    orders,
    statistics,
    pagination,
    isLoading,
    error,
    refetch: fetchOrders,
    setPage,
    setFilters: updateFilters,
  };
}

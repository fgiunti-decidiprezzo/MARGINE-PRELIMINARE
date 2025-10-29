/**
 * Hook per gestire l'esportazione dei dati
 */

import { useState, useCallback } from 'react';
import { apiService } from '@/services/api.service';
import type { OrderFilters, LoadingState } from '@/types/order.types';

interface UseExportResult extends LoadingState {
  /** Funzione per esportare in CSV */
  exportCsv: (filters?: OrderFilters, includeShipments?: boolean) => Promise<void>;
  /** Funzione per esportare in Excel */
  exportExcel: (filters?: OrderFilters, includeShipments?: boolean) => Promise<void>;
}

/**
 * Hook per gestire l'esportazione dei dati in CSV o Excel
 */
export function useExport(): UseExportResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Scarica un file blob
   */
  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  /**
   * Genera il nome del file basato sui filtri
   */
  const generateFilename = (format: 'csv' | 'xlsx', filters?: OrderFilters): string => {
    const date = new Date().toISOString().split('T')[0];
    const dateRange = filters?.dateFrom && filters?.dateTo
      ? `_${filters.dateFrom}_${filters.dateTo}`
      : `_${date}`;

    return `ordini${dateRange}.${format}`;
  };

  /**
   * Esporta in CSV
   */
  const exportCsv = useCallback(async (
    filters: OrderFilters = {},
    includeShipments = true
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const blob = await apiService.exportOrders('csv', filters, includeShipments);
      const filename = generateFilename('csv', filters);
      downloadBlob(blob, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante l\'esportazione');
      console.error('Error exporting CSV:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Esporta in Excel
   */
  const exportExcel = useCallback(async (
    filters: OrderFilters = {},
    includeShipments = true
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const blob = await apiService.exportOrders('xlsx', filters, includeShipments);
      const filename = generateFilename('xlsx', filters);
      downloadBlob(blob, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante l\'esportazione');
      console.error('Error exporting Excel:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    exportCsv,
    exportExcel,
  };
}

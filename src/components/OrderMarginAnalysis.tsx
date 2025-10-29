/**
 * Componente principale per l'analisi del margine operativo
 */

import React, { useState } from 'react';
import { Filters } from './Filters';
import { Statistics } from './Statistics';
import { OrderTable } from './OrderTable';
import { useOrders } from '@/hooks/useOrders';
import { useExport } from '@/hooks/useExport';
import type { OrderFilters } from '@/types/order.types';
import './OrderMarginAnalysis.css';

export const OrderMarginAnalysis: React.FC = () => {
  const [filters, setFilters] = useState<OrderFilters>({});

  // Hook per caricare gli ordini
  const { orders, statistics, pagination, isLoading, error, setPage, setFilters: updateFilters } =
    useOrders(filters);

  // Hook per gestire l'esportazione
  const { exportCsv, exportExcel, isLoading: exportLoading } = useExport();

  /**
   * Gestisce il cambio di filtri
   */
  const handleFiltersChange = (newFilters: OrderFilters) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  /**
   * Gestisce l'esportazione dei dati
   */
  const handleExport = async (format: 'csv' | 'xlsx') => {
    try {
      if (format === 'csv') {
        await exportCsv(filters, true);
      } else {
        await exportExcel(filters, true);
      }
    } catch (err) {
      console.error('Export error:', err);
      alert('Errore durante l\'esportazione dei dati');
    }
  };

  /**
   * Gestisce il cambio di pagina
   */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="order-margin-analysis">
      {/* Header */}
      <div className="header">
        <h1>Analisi Margine Operativo Lordo Preliminare</h1>

        <div className="header-content">
          {/* Sezione Filtri */}
          <Filters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onExport={exportLoading ? undefined : handleExport}
          />

          {/* Sezione Statistiche */}
          <Statistics statistics={statistics} isLoading={isLoading} />
        </div>
      </div>

      {/* Messaggio di errore */}
      {error && (
        <div className="error-message">
          <strong>Errore:</strong> {error}
        </div>
      )}

      {/* Tabella Ordini */}
      <OrderTable orders={orders} isLoading={isLoading} />

      {/* Paginazione */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || isLoading}
            className="btn-pagination"
          >
            ← Precedente
          </button>

          <span className="pagination-info">
            Pagina {pagination.page} di {pagination.totalPages} ({pagination.total} ordini totali)
          </span>

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages || isLoading}
            className="btn-pagination"
          >
            Successiva →
          </button>
        </div>
      )}

      {/* Loading overlay per esportazione */}
      {exportLoading && (
        <div className="export-overlay">
          <div className="export-spinner">
            <div className="spinner"></div>
            <p>Esportazione in corso...</p>
          </div>
        </div>
      )}
    </div>
  );
};

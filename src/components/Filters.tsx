/**
 * Componente per i filtri di ricerca ordini
 */

import React, { useState, useEffect } from 'react';
import type { OrderFilters, FilterOptions } from '@/types/order.types';
import { useFilterOptions } from '@/hooks/useFilterOptions';
import { getCurrentMonthRange } from '@/utils/calculations';
import './Filters.css';

interface FiltersProps {
  /** Filtri correnti */
  filters: OrderFilters;
  /** Callback quando i filtri cambiano */
  onFiltersChange: (filters: OrderFilters) => void;
  /** Callback per esportare i dati */
  onExport?: (format: 'csv' | 'xlsx') => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange, onExport }) => {
  const { options, isLoading: optionsLoading } = useFilterOptions();
  const [localFilters, setLocalFilters] = useState<OrderFilters>(filters);

  // Sincronizza i filtri locali con quelli esterni
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  /**
   * Aggiorna un singolo filtro
   */
  const updateFilter = (key: keyof OrderFilters, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  /**
   * Applica i filtri
   */
  const handleSearch = () => {
    onFiltersChange(localFilters);
  };

  /**
   * Resetta i filtri
   */
  const handleReset = () => {
    const emptyFilters: OrderFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  /**
   * Imposta il range del mese corrente
   */
  const setCurrentMonth = () => {
    const range = getCurrentMonthRange();
    setLocalFilters((prev) => ({
      ...prev,
      dateFrom: range.from,
      dateTo: range.to,
    }));
  };

  /**
   * Gestisce l'invio del form (Enter)
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="filters-section">
      <div className="filters-header">
        <h3>Filtri</h3>
        <div className="filters-actions">
          <button type="button" onClick={handleReset} className="btn-reset">
            Reset
          </button>
          {onExport && (
            <div className="export-buttons">
              <button
                type="button"
                onClick={() => onExport('csv')}
                className="btn-export"
                title="Esporta in CSV"
              >
                CSV
              </button>
              <button
                type="button"
                onClick={() => onExport('xlsx')}
                className="btn-export"
                title="Esporta in Excel"
              >
                Excel
              </button>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="filters-grid">
          {/* Ricerca testuale */}
          <div className="filter-group">
            <label htmlFor="searchQuery">Ricerca</label>
            <input
              id="searchQuery"
              type="text"
              placeholder="Ordine, cliente, tracking..."
              value={localFilters.searchQuery || ''}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
            />
          </div>

          {/* Data Da */}
          <div className="filter-group">
            <label htmlFor="dateFrom">Data Da</label>
            <input
              id="dateFrom"
              type="date"
              value={localFilters.dateFrom || ''}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
            />
          </div>

          {/* Data A */}
          <div className="filter-group">
            <label htmlFor="dateTo">Data A</label>
            <div className="input-with-action">
              <input
                id="dateTo"
                type="date"
                value={localFilters.dateTo || ''}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
              />
              <button
                type="button"
                onClick={setCurrentMonth}
                className="btn-quick-filter"
                title="Mese corrente"
              >
                Mese
              </button>
            </div>
          </div>

          {/* Fornitore */}
          <div className="filter-group">
            <label htmlFor="supplier">Fornitore</label>
            <select
              id="supplier"
              value={localFilters.supplier || ''}
              onChange={(e) => updateFilter('supplier', e.target.value)}
              disabled={optionsLoading}
            >
              <option value="">Tutti</option>
              {options.suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          {/* Data Evasione */}
          <div className="filter-group">
            <label htmlFor="fulfillmentDate">Data Evasione</label>
            <input
              id="fulfillmentDate"
              type="date"
              value={localFilters.fulfillmentDate || ''}
              onChange={(e) => updateFilter('fulfillmentDate', e.target.value)}
            />
          </div>

          {/* Logistica */}
          <div className="filter-group">
            <label htmlFor="warehouse">Logistica</label>
            <select
              id="warehouse"
              value={localFilters.warehouse || ''}
              onChange={(e) => updateFilter('warehouse', e.target.value)}
              disabled={optionsLoading}
            >
              <option value="">Tutti</option>
              {options.warehouses.map((warehouse) => (
                <option key={warehouse} value={warehouse}>
                  {warehouse}
                </option>
              ))}
            </select>
          </div>

          {/* Corriere */}
          <div className="filter-group">
            <label htmlFor="courier">Corriere</label>
            <select
              id="courier"
              value={localFilters.courier || ''}
              onChange={(e) => updateFilter('courier', e.target.value)}
              disabled={optionsLoading}
            >
              <option value="">Tutti</option>
              {options.couriers.map((courier) => (
                <option key={courier} value={courier}>
                  {courier}
                </option>
              ))}
            </select>
          </div>

          {/* Costo Prodotto */}
          <div className="filter-group">
            <label htmlFor="productCostStatus">Costo Prodotto</label>
            <select
              id="productCostStatus"
              value={localFilters.productCostStatus || ''}
              onChange={(e) =>
                updateFilter('productCostStatus', e.target.value as 'ok' | 'ko')
              }
            >
              <option value="">Tutti</option>
              <option value="ok">OK</option>
              <option value="ko">KO</option>
            </select>
          </div>

          {/* Costo Spedizione */}
          <div className="filter-group">
            <label htmlFor="shippingCostStatus">Costo Spedizione</label>
            <select
              id="shippingCostStatus"
              value={localFilters.shippingCostStatus || ''}
              onChange={(e) =>
                updateFilter('shippingCostStatus', e.target.value as 'ok' | 'ko')
              }
            >
              <option value="">Tutti</option>
              <option value="ok">OK</option>
              <option value="ko">KO</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-search">
          Cerca
        </button>
      </form>
    </div>
  );
};

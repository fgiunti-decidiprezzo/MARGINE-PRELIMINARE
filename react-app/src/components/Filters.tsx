import { OrderFilters } from '../types';

interface FiltersProps {
  filters: OrderFilters;
  setFilters: (filters: OrderFilters) => void;
  filterOptions: {
    marketplaces: string[];
    suppliers: string[];
    warehouses: string[];
    couriers: string[];
  };
  onSearch: () => void;
  onReset: () => void;
}

export default function Filters({ filters, setFilters, filterOptions, onSearch, onReset }: FiltersProps) {
  const updateFilter = (field: keyof OrderFilters, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white border-b-2 border-gray-200 shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📊 Analisi Margine Preliminare Ordini
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Ricerca:</label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            placeholder="ID, Cliente, Tracking..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date From */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Data Da:</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => updateFilter('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Data A:</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => updateFilter('dateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Marketplace */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Marketplace:</label>
          <select
            value={filters.marketplace}
            onChange={(e) => updateFilter('marketplace', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tutti</option>
            {filterOptions.marketplaces.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Supplier */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Fornitore:</label>
          <select
            value={filters.supplier}
            onChange={(e) => updateFilter('supplier', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tutti</option>
            {filterOptions.suppliers.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Warehouse */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Magazzino:</label>
          <select
            value={filters.warehouse}
            onChange={(e) => updateFilter('warehouse', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tutti</option>
            {filterOptions.warehouses.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {/* Courier */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Corriere:</label>
          <select
            value={filters.courier}
            onChange={(e) => updateFilter('courier', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tutti</option>
            {filterOptions.couriers.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Product Cost Status */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Costo Prodotto:</label>
          <select
            value={filters.productCostStatus}
            onChange={(e) => updateFilter('productCostStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tutti</option>
            <option value="OK">OK</option>
            <option value="KO">KO</option>
          </select>
        </div>

        {/* Shipping Cost Status */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Costo Spedizione:</label>
          <select
            value={filters.shippingCostStatus}
            onChange={(e) => updateFilter('shippingCostStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tutti</option>
            <option value="OK">OK</option>
            <option value="KO">KO</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSearch}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
        >
          🔍 Cerca
        </button>
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition-colors"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

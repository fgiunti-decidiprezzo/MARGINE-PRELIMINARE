import { useState, useEffect } from 'react';
import { Order, OrderFilters, OrderStatistics } from './types';
import { mockOrders } from './mockData';
import Filters from './components/Filters';
import OrdersTable from './components/OrdersTable';
import Statistics from './components/Statistics';

function App() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [statistics, setStatistics] = useState<OrderStatistics>({
    totalOrders: 0,
    profitableOrders: 0,
    losingOrders: 0,
    profitablePercentage: 0,
    losingPercentage: 0,
    totalMargin: 0,
    totalRevenue: 0,
    totalCosts: 0
  });

  const [filters, setFilters] = useState<OrderFilters>({
    searchQuery: '',
    dateFrom: '',
    dateTo: '',
    marketplace: '',
    supplier: '',
    warehouse: '',
    courier: '',
    productCostStatus: '',
    shippingCostStatus: ''
  });

  const filterOptions = {
    marketplaces: Array.from(new Set(orders.map(o => o.marketplace))).sort(),
    suppliers: Array.from(new Set(orders.map(o => o.supplier))).sort(),
    warehouses: Array.from(new Set(orders.map(o => o.warehouse))).sort(),
    couriers: Array.from(new Set(orders.map(o => o.courier))).sort()
  };

  const applyFilters = () => {
    let result = [...orders];

    // Search filter
    if (filters.searchQuery.trim()) {
      const search = filters.searchQuery.toLowerCase();
      result = result.filter(
        o =>
          o.id.toLowerCase().includes(search) ||
          o.customerName.toLowerCase().includes(search) ||
          o.shipments.some(s => s.trackingNumber.toLowerCase().includes(search))
      );
    }

    // Date filters
    if (filters.dateFrom) {
      result = result.filter(o => o.orderDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter(o => o.orderDate <= filters.dateTo);
    }

    // Dropdown filters
    if (filters.marketplace) {
      result = result.filter(o => o.marketplace === filters.marketplace);
    }
    if (filters.supplier) {
      result = result.filter(o => o.supplier === filters.supplier);
    }
    if (filters.warehouse) {
      result = result.filter(o => o.warehouse === filters.warehouse);
    }
    if (filters.courier) {
      result = result.filter(o => o.courier === filters.courier);
    }

    // Cost status filters
    if (filters.productCostStatus) {
      const isValid = filters.productCostStatus === 'OK';
      result = result.filter(o => o.hasValidProductCost === isValid);
    }
    if (filters.shippingCostStatus) {
      const isValid = filters.shippingCostStatus === 'OK';
      result = result.filter(o => o.hasValidShippingCost === isValid);
    }

    setFilteredOrders(result);
  };

  const calculateStatistics = (orders: Order[]): OrderStatistics => {
    const stats: OrderStatistics = {
      totalOrders: orders.length,
      profitableOrders: orders.filter(o => o.margin.value > 0).length,
      losingOrders: orders.filter(o => o.margin.value < 0).length,
      profitablePercentage: 0,
      losingPercentage: 0,
      totalMargin: orders.reduce((sum, o) => sum + o.margin.value, 0),
      totalRevenue: orders.reduce((sum, o) => sum + o.revenue.total, 0),
      totalCosts: orders.reduce((sum, o) => sum + o.costs.total, 0)
    };

    if (stats.totalOrders > 0) {
      stats.profitablePercentage = (stats.profitableOrders / stats.totalOrders) * 100;
      stats.losingPercentage = (stats.losingOrders / stats.totalOrders) * 100;
    }

    return stats;
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  useEffect(() => {
    setStatistics(calculateStatistics(filteredOrders));
  }, [filteredOrders]);

  const handleSearch = () => {
    applyFilters();
  };

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      dateFrom: '',
      dateTo: '',
      marketplace: '',
      supplier: '',
      warehouse: '',
      courier: '',
      productCostStatus: '',
      shippingCostStatus: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <Filters
          filters={filters}
          setFilters={setFilters}
          filterOptions={filterOptions}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            <OrdersTable orders={filteredOrders} setOrders={setFilteredOrders} />
          </div>

          <div className="w-80 bg-blue-50 border-l-2 border-blue-200 p-6 overflow-auto">
            <Statistics statistics={statistics} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

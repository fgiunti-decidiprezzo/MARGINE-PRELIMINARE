export interface Revenue {
  productValue: number;
  shippingValue: number;
  discounts: number;
  total: number;
}

export interface Costs {
  productCost: number;
  shippingCost: number;
  commissions: number;
  total: number;
}

export interface Margin {
  value: number;
  percentage: number;
}

export interface Shipment {
  trackingNumber: string;
  marketplace: string;
  customerName: string;
  shippingDate: string;
  courier: string;
  revenue: Revenue;
  costs: Costs;
  margin: Margin;
  hasValidProductCost: boolean;
  hasValidShippingCost: boolean;
}

export interface Order {
  id: string;
  marketplace: string;
  customerName: string;
  orderDate: string;
  fulfillmentDate: string;
  supplier: string;
  warehouse: string;
  courier: string;
  revenue: Revenue;
  costs: Costs;
  margin: Margin;
  hasValidProductCost: boolean;
  hasValidShippingCost: boolean;
  shipments: Shipment[];
  isExpanded?: boolean;
}

export interface OrderFilters {
  searchQuery: string;
  dateFrom: string;
  dateTo: string;
  marketplace: string;
  supplier: string;
  warehouse: string;
  courier: string;
  productCostStatus: string;
  shippingCostStatus: string;
}

export interface OrderStatistics {
  totalOrders: number;
  profitableOrders: number;
  losingOrders: number;
  profitablePercentage: number;
  losingPercentage: number;
  totalMargin: number;
  totalRevenue: number;
  totalCosts: number;
}

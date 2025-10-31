import { Order } from './types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    marketplace: 'Amazon',
    customerName: 'Mario Rossi',
    orderDate: '2024-01-15',
    fulfillmentDate: '2024-01-16',
    supplier: 'Fornitore A',
    warehouse: 'Milano',
    courier: 'DHL',
    revenue: {
      productValue: 250.00,
      shippingValue: 15.00,
      discounts: 0.00,
      total: 265.00
    },
    costs: {
      productCost: 180.00,
      shippingCost: 12.00,
      commissions: 26.50,
      total: 218.50
    },
    margin: {
      value: 46.50,
      percentage: 17.55
    },
    hasValidProductCost: true,
    hasValidShippingCost: true,
    shipments: []
  },
  {
    id: 'ORD-002',
    marketplace: 'eBay',
    customerName: 'Laura Bianchi',
    orderDate: '2024-01-18',
    fulfillmentDate: '2024-01-19',
    supplier: 'Fornitore B',
    warehouse: 'Roma',
    courier: 'UPS',
    revenue: {
      productValue: 180.00,
      shippingValue: 12.00,
      discounts: 15.00,
      total: 177.00
    },
    costs: {
      productCost: 150.00,
      shippingCost: 30.50,
      commissions: 18.18,
      total: 198.68
    },
    margin: {
      value: -21.68,
      percentage: -12.25
    },
    hasValidProductCost: false,
    hasValidShippingCost: true,
    shipments: []
  },
  {
    id: 'ORD-003',
    marketplace: 'Sito Web',
    customerName: 'Giuseppe Verdi',
    orderDate: '2024-01-20',
    fulfillmentDate: '2024-01-21',
    supplier: 'Fornitore C',
    warehouse: 'Torino',
    courier: 'FedEx',
    revenue: {
      productValue: 500.00,
      shippingValue: 0.00,
      discounts: 50.00,
      total: 450.00
    },
    costs: {
      productCost: 400.00,
      shippingCost: 5.00,
      commissions: 45.00,
      total: 450.00
    },
    margin: {
      value: 0.00,
      percentage: 0.00
    },
    hasValidProductCost: true,
    hasValidShippingCost: true,
    shipments: []
  },
  {
    id: 'ORD-004',
    marketplace: 'Amazon',
    customerName: 'Anna Ferrari',
    orderDate: '2024-01-22',
    fulfillmentDate: '2024-01-23',
    supplier: 'Fornitore A',
    warehouse: 'Milano',
    courier: 'BRT',
    revenue: {
      productValue: 320.00,
      shippingValue: 18.00,
      discounts: 0.00,
      total: 338.00
    },
    costs: {
      productCost: 220.00,
      shippingCost: 12.00,
      commissions: 34.00,
      total: 266.00
    },
    margin: {
      value: 72.00,
      percentage: 21.30
    },
    hasValidProductCost: true,
    hasValidShippingCost: true,
    shipments: []
  },
  {
    id: 'ORD-005',
    marketplace: 'eBay',
    customerName: 'Marco Gialli',
    orderDate: '2024-01-25',
    fulfillmentDate: '2024-01-26',
    supplier: 'Fornitore B',
    warehouse: 'Roma',
    courier: 'DHL',
    revenue: {
      productValue: 150.00,
      shippingValue: 10.00,
      discounts: 5.00,
      total: 155.00
    },
    costs: {
      productCost: 130.00,
      shippingCost: 35.00,
      commissions: 17.68,
      total: 182.68
    },
    margin: {
      value: -27.68,
      percentage: -17.86
    },
    hasValidProductCost: true,
    hasValidShippingCost: false,
    shipments: []
  }
];

/**
 * Servizio Supabase per interrogare il database
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type {
  Order,
  OrderShipment,
  OrderFilters,
  OrdersResponse,
  OrderStatistics,
  FilterOptions,
  PaginationParams,
} from '@/types/order.types';

class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Converte una riga del database in un oggetto Order
   */
  private mapDbRowToOrder(orderRow: any, shipmentsRows: any[]): Order {
    const shipments: OrderShipment[] = shipmentsRows.map((s) => ({
      id: s.id,
      orderId: s.order_id,
      trackingNumber: s.tracking_number,
      marketplace: s.marketplace,
      customerName: s.customer_name,
      quantity: s.quantity,
      revenue: {
        productValue: parseFloat(s.product_value),
        shippingValue: parseFloat(s.shipping_value),
        discounts: parseFloat(s.discounts),
        total: parseFloat(s.revenue_total),
      },
      costs: {
        productCost: parseFloat(s.product_cost),
        shippingCost: parseFloat(s.shipping_cost),
        commissions: parseFloat(s.commissions),
        total: parseFloat(s.costs_total),
      },
      margin: {
        value: parseFloat(s.margin_value),
        percentage: parseFloat(s.margin_percentage),
      },
      hasValidProductCost: s.has_valid_product_cost,
      hasValidShippingCost: s.has_valid_shipping_cost,
    }));

    return {
      id: orderRow.id,
      marketplace: orderRow.marketplace,
      customerName: orderRow.customer_name,
      orderDate: orderRow.order_date,
      fulfillmentDate: orderRow.fulfillment_date,
      supplier: orderRow.supplier,
      warehouse: orderRow.warehouse,
      courier: orderRow.courier,
      revenue: {
        productValue: parseFloat(orderRow.product_value),
        shippingValue: parseFloat(orderRow.shipping_value),
        discounts: parseFloat(orderRow.discounts),
        total: parseFloat(orderRow.revenue_total),
      },
      costs: {
        productCost: parseFloat(orderRow.product_cost),
        shippingCost: parseFloat(orderRow.shipping_cost),
        commissions: parseFloat(orderRow.commissions),
        total: parseFloat(orderRow.costs_total),
      },
      margin: {
        value: parseFloat(orderRow.margin_value),
        percentage: parseFloat(orderRow.margin_percentage),
      },
      shipments,
      hasValidProductCosts: orderRow.has_valid_product_costs,
      hasValidShippingCosts: orderRow.has_valid_shipping_costs,
    };
  }

  /**
   * Applica i filtri alla query
   */
  private applyFilters(query: any, filters: OrderFilters) {
    if (filters.searchQuery) {
      const search = `%${filters.searchQuery}%`;
      query = query.or(`id.ilike.${search},customer_name.ilike.${search}`);
    }

    if (filters.dateFrom) {
      query = query.gte('order_date', filters.dateFrom);
    }

    if (filters.dateTo) {
      query = query.lte('order_date', filters.dateTo);
    }

    if (filters.supplier) {
      query = query.eq('supplier', filters.supplier);
    }

    if (filters.fulfillmentDate) {
      query = query.eq('fulfillment_date', filters.fulfillmentDate);
    }

    if (filters.warehouse) {
      query = query.eq('warehouse', filters.warehouse);
    }

    if (filters.courier) {
      query = query.eq('courier', filters.courier);
    }

    if (filters.productCostStatus === 'ok') {
      query = query.eq('has_valid_product_costs', true);
    } else if (filters.productCostStatus === 'ko') {
      query = query.eq('has_valid_product_costs', false);
    }

    if (filters.shippingCostStatus === 'ok') {
      query = query.eq('has_valid_shipping_costs', true);
    } else if (filters.shippingCostStatus === 'ko') {
      query = query.eq('has_valid_shipping_costs', false);
    }

    return query;
  }

  /**
   * Recupera gli ordini con filtri e paginazione
   */
  async getOrders(
    filters: OrderFilters = {},
    pagination: PaginationParams = { page: 1, pageSize: 50 }
  ): Promise<OrdersResponse> {
    // Query ordini
    let ordersQuery = this.client.from('orders').select('*', { count: 'exact' });
    ordersQuery = this.applyFilters(ordersQuery, filters);

    // Paginazione
    const from = (pagination.page - 1) * pagination.pageSize;
    const to = from + pagination.pageSize - 1;
    ordersQuery = ordersQuery.range(from, to).order('order_date', { ascending: false });

    const { data: ordersData, error: ordersError, count } = await ordersQuery;

    if (ordersError) throw new Error(ordersError.message);
    if (!ordersData) throw new Error('No data returned');

    // Query shipments per tutti gli ordini
    const orderIds = ordersData.map((o) => o.id);
    const { data: shipmentsData, error: shipmentsError } = await this.client
      .from('shipments')
      .select('*')
      .in('order_id', orderIds);

    if (shipmentsError) throw new Error(shipmentsError.message);

    // Mappa ordini con le loro spedizioni
    const orders: Order[] = ordersData.map((orderRow) => {
      const orderShipments = shipmentsData?.filter((s) => s.order_id === orderRow.id) || [];
      return this.mapDbRowToOrder(orderRow, orderShipments);
    });

    // Calcola statistiche
    const statistics = await this.calculateStatistics(filters);

    return {
      orders,
      statistics,
      pagination: {
        total: count || 0,
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalPages: Math.ceil((count || 0) / pagination.pageSize),
      },
    };
  }

  /**
   * Calcola le statistiche aggregate
   */
  async calculateStatistics(filters: OrderFilters = {}): Promise<OrderStatistics> {
    let query = this.client.from('orders').select('*');
    query = this.applyFilters(query, filters);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    if (!data) return this.getEmptyStatistics();

    const totalOrders = data.length;
    const profitableOrders = data.filter((o) => parseFloat(o.margin_value) > 0).length;
    const losingOrders = data.filter((o) => parseFloat(o.margin_value) < 0).length;
    const totalMargin = data.reduce((sum, o) => sum + parseFloat(o.margin_value), 0);
    const totalRevenue = data.reduce((sum, o) => sum + parseFloat(o.revenue_total), 0);
    const totalCosts = data.reduce((sum, o) => sum + parseFloat(o.costs_total), 0);
    const averageMarginPercentage =
      totalOrders > 0
        ? data.reduce((sum, o) => sum + parseFloat(o.margin_percentage), 0) / totalOrders
        : 0;

    return {
      totalOrders,
      profitableOrders,
      profitablePercentage: totalOrders > 0 ? (profitableOrders / totalOrders) * 100 : 0,
      losingOrders,
      losingPercentage: totalOrders > 0 ? (losingOrders / totalOrders) * 100 : 0,
      totalMargin,
      totalRevenue,
      totalCosts,
      averageMarginPercentage,
    };
  }

  /**
   * Recupera le opzioni per i filtri
   */
  async getFilterOptions(): Promise<FilterOptions> {
    const { data: orders, error } = await this.client.from('orders').select('supplier, warehouse, courier, marketplace');

    if (error) throw new Error(error.message);
    if (!orders) return { suppliers: [], warehouses: [], couriers: [], marketplaces: [] };

    const suppliers = [...new Set(orders.map((o) => o.supplier).filter(Boolean))];
    const warehouses = [...new Set(orders.map((o) => o.warehouse).filter(Boolean))];
    const couriers = [...new Set(orders.map((o) => o.courier).filter(Boolean))];
    const marketplaces = [...new Set(orders.map((o) => o.marketplace).filter(Boolean))];

    return {
      suppliers: suppliers as string[],
      warehouses: warehouses as string[],
      couriers: couriers as string[],
      marketplaces: marketplaces as string[],
    };
  }

  private getEmptyStatistics(): OrderStatistics {
    return {
      totalOrders: 0,
      profitableOrders: 0,
      profitablePercentage: 0,
      losingOrders: 0,
      losingPercentage: 0,
      totalMargin: 0,
      totalRevenue: 0,
      totalCosts: 0,
      averageMarginPercentage: 0,
    };
  }
}

export const supabaseService = new SupabaseService();
export default supabaseService;

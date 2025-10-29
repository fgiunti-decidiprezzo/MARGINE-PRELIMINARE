/**
 * Servizio API per comunicazione con il backend
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  Order,
  OrderFilters,
  OrdersResponse,
  OrderStatistics,
  FilterOptions,
  PaginationParams,
} from '@/types/order.types';
import { mockOrdersResponse, mockFilterOptions } from '@/data/mockData';

// Usa mock data se VITE_USE_MOCK_DATA=true o se l'API non è raggiungibile
const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

/**
 * Configurazione del client API
 */
class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor per aggiungere il token JWT
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor per gestire errori comuni
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token scaduto o non valido
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Gestisce gli errori delle API e li trasforma in un formato consistente
   */
  private handleError(error: AxiosError): Error {
    if (error.response?.data) {
      const errorData = error.response.data as any;
      return new Error(errorData.error?.message || 'Errore sconosciuto');
    }
    if (error.request) {
      return new Error('Impossibile contattare il server');
    }
    return new Error(error.message || 'Errore sconosciuto');
  }

  /**
   * GET /orders
   * Recupera la lista degli ordini con filtri e paginazione
   */
  async getOrders(
    filters: OrderFilters = {},
    pagination: PaginationParams = { page: 1, pageSize: 50 }
  ): Promise<OrdersResponse> {
    // Usa mock data se attivato
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockOrdersResponse), 500);
      });
    }

    const params = {
      ...filters,
      page: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await this.client.get<OrdersResponse>('/orders', { params });
    return response.data;
  }

  /**
   * GET /orders/:id
   * Recupera il dettaglio di un singolo ordine
   */
  async getOrderById(orderId: string): Promise<Order> {
    const response = await this.client.get<Order>(`/orders/${orderId}`);
    return response.data;
  }

  /**
   * GET /orders/statistics
   * Recupera solo le statistiche aggregate
   */
  async getStatistics(filters: OrderFilters = {}): Promise<OrderStatistics> {
    const response = await this.client.get<OrderStatistics>('/orders/statistics', {
      params: filters,
    });
    return response.data;
  }

  /**
   * GET /filter-options
   * Recupera le opzioni disponibili per i filtri
   */
  async getFilterOptions(): Promise<FilterOptions> {
    // Usa mock data se attivato
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockFilterOptions), 300);
      });
    }

    const response = await this.client.get<FilterOptions>('/filter-options');
    return response.data;
  }

  /**
   * POST /orders/export
   * Esporta i dati in CSV o Excel
   */
  async exportOrders(
    format: 'csv' | 'xlsx',
    filters: OrderFilters = {},
    includeShipments = true
  ): Promise<Blob> {
    const response = await this.client.post(
      '/orders/export',
      {
        format,
        filters,
        includeShipments,
      },
      {
        responseType: 'blob',
      }
    );
    return response.data;
  }

  /**
   * POST /auth/login
   * Autentica l'utente e ottiene il token JWT
   */
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const response = await this.client.post('/auth/login', { email, password });
    const { token, user } = response.data;

    // Salva il token in localStorage
    localStorage.setItem('authToken', token);

    return { token, user };
  }

  /**
   * POST /auth/logout
   * Effettua il logout
   */
  async logout(): Promise<void> {
    await this.client.post('/auth/logout');
    localStorage.removeItem('authToken');
  }
}

// Esporta un'istanza singleton del servizio
export const apiService = new ApiService();
export default apiService;

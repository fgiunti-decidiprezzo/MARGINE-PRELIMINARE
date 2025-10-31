/**
 * Tipi e interfacce per il sistema di analisi margine operativo
 */

/**
 * Rappresenta una singola spedizione/articolo all'interno di un ordine
 */
export interface OrderShipment {
  /** ID univoco della spedizione */
  id: string;
  /** ID dell'ordine padre */
  orderId: string;
  /** Numero di tracking della spedizione */
  trackingNumber: string | null;
  /** Marketplace di origine (Amazon, eBay, Sito Web, ecc.) */
  marketplace: string;
  /** Nome del cliente */
  customerName: string;
  /** Quantità di prodotti in questa spedizione */
  quantity: number;

  /** Valori incassati */
  revenue: {
    /** Valore dei prodotti venduti */
    productValue: number;
    /** Valore della spedizione addebitata al cliente */
    shippingValue: number;
    /** Sconti applicati */
    discounts: number;
    /** Totale incassato (productValue + shippingValue - discounts) */
    total: number;
  };

  /** Costi sostenuti */
  costs: {
    /** Costo di acquisto/produzione del prodotto */
    productCost: number;
    /** Costo effettivo della spedizione */
    shippingCost: number;
    /** Commissioni (marketplace, payment gateway, ecc.) */
    commissions: number;
    /** Totale costi (productCost + shippingCost + commissions) */
    total: number;
  };

  /** Margine operativo */
  margin: {
    /** Margine in valore assoluto (revenue.total - costs.total) */
    value: number;
    /** Margine in percentuale rispetto al ricavo */
    percentage: number;
  };

  /** Indica se i dati dei costi prodotto sono disponibili e corretti */
  hasValidProductCost: boolean;
  /** Indica se i dati dei costi spedizione sono disponibili e corretti */
  hasValidShippingCost: boolean;
}

/**
 * Rappresenta un ordine completo con le sue spedizioni
 */
export interface Order {
  /** ID univoco dell'ordine */
  id: string;
  /** Marketplace di origine */
  marketplace: string;
  /** Nome del cliente */
  customerName: string;
  /** Data di creazione dell'ordine */
  orderDate: string;
  /** Data di evasione dell'ordine (può essere null se non ancora evaso) */
  fulfillmentDate: string | null;
  /** Nome del fornitore */
  supplier: string | null;
  /** Magazzino/centro logistico */
  warehouse: string | null;
  /** Corriere utilizzato */
  courier: string | null;

  /** Valori aggregati per l'intero ordine */
  revenue: {
    productValue: number;
    shippingValue: number;
    discounts: number;
    total: number;
  };

  /** Costi aggregati per l'intero ordine */
  costs: {
    productCost: number;
    shippingCost: number;
    commissions: number;
    total: number;
  };

  /** Margine operativo aggregato */
  margin: {
    value: number;
    percentage: number;
  };

  /** Lista delle spedizioni associate all'ordine */
  shipments: OrderShipment[];

  /** Indica se tutti i costi prodotto delle spedizioni sono validi */
  hasValidProductCosts: boolean;
  /** Indica se tutti i costi spedizione delle spedizioni sono validi */
  hasValidShippingCosts: boolean;
}

/**
 * Filtri per la ricerca degli ordini
 */
export interface OrderFilters {
  /** Ricerca testuale (ordine, cliente, tracking) */
  searchQuery?: string;
  /** Data inizio */
  dateFrom?: string;
  /** Data fine */
  dateTo?: string;
  /** Filtro per fornitore */
  supplier?: string;
  /** Data di evasione specifica */
  fulfillmentDate?: string;
  /** Filtro per magazzino/logistica */
  warehouse?: string;
  /** Filtro per corriere */
  courier?: string;
  /** Filtro per validità costi prodotto: 'ok' = validi, 'ko' = non validi */
  productCostStatus?: 'ok' | 'ko';
  /** Filtro per validità costi spedizione: 'ok' = validi, 'ko' = non validi */
  shippingCostStatus?: 'ok' | 'ko';
}

/**
 * Statistiche aggregate sugli ordini
 */
export interface OrderStatistics {
  /** Numero totale di ordini */
  totalOrders: number;
  /** Numero di ordini in profitto */
  profitableOrders: number;
  /** Percentuale di ordini in profitto */
  profitablePercentage: number;
  /** Numero di ordini in perdita */
  losingOrders: number;
  /** Percentuale di ordini in perdita */
  losingPercentage: number;
  /** Margine totale aggregato */
  totalMargin: number;
  /** Valore totale degli ordini */
  totalRevenue: number;
  /** Costi totali */
  totalCosts: number;
  /** Margine percentuale medio */
  averageMarginPercentage: number;
}

/**
 * Risposta API per la lista ordini
 */
export interface OrdersResponse {
  /** Lista degli ordini */
  orders: Order[];
  /** Statistiche aggregate */
  statistics: OrderStatistics;
  /** Metadati di paginazione */
  pagination: {
    /** Numero totale di ordini disponibili */
    total: number;
    /** Pagina corrente */
    page: number;
    /** Numero di elementi per pagina */
    pageSize: number;
    /** Numero totale di pagine */
    totalPages: number;
  };
}

/**
 * Opzioni per le select dei filtri
 */
export interface FilterOptions {
  /** Lista dei fornitori disponibili */
  suppliers: string[];
  /** Lista dei magazzini disponibili */
  warehouses: string[];
  /** Lista dei corrieri disponibili */
  couriers: string[];
  /** Lista dei marketplace disponibili */
  marketplaces: string[];
}

/**
 * Parametri di paginazione
 */
export interface PaginationParams {
  /** Numero di pagina (1-based) */
  page: number;
  /** Numero di elementi per pagina */
  pageSize: number;
}

/**
 * Stato di caricamento generico per le API
 */
export interface LoadingState {
  /** Indica se è in corso un caricamento */
  isLoading: boolean;
  /** Eventuale messaggio di errore */
  error: string | null;
}

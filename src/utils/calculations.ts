/**
 * Utility functions per calcoli relativi a margini e costi
 */

import type { Order, OrderShipment } from '@/types/order.types';

/**
 * Formatta un numero come valuta EUR
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formatta una percentuale
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Calcola il margine in valore assoluto
 */
export function calculateMarginValue(revenue: number, costs: number): number {
  return revenue - costs;
}

/**
 * Calcola il margine percentuale
 */
export function calculateMarginPercentage(marginValue: number, revenue: number): number {
  if (revenue === 0) return 0;
  return (marginValue / revenue) * 100;
}

/**
 * Determina se un margine è positivo, negativo o neutro
 */
export function getMarginStatus(marginValue: number): 'positive' | 'negative' | 'neutral' {
  if (marginValue > 0) return 'positive';
  if (marginValue < 0) return 'negative';
  return 'neutral';
}

/**
 * Determina il colore CSS in base allo stato del margine
 */
export function getMarginColor(marginValue: number): string {
  const status = getMarginStatus(marginValue);
  switch (status) {
    case 'positive':
      return '#28a745';
    case 'negative':
      return '#d73a49';
    case 'neutral':
      return '#6a737d';
  }
}

/**
 * Calcola il totale dei ricavi
 */
export function calculateRevenueTotal(
  productValue: number,
  shippingValue: number,
  discounts: number
): number {
  return productValue + shippingValue - discounts;
}

/**
 * Calcola il totale dei costi
 */
export function calculateCostsTotal(
  productCost: number,
  shippingCost: number,
  commissions: number
): number {
  return productCost + shippingCost + commissions;
}

/**
 * Valida se tutti i costi di un ordine sono presenti e corretti
 */
export function validateOrderCosts(order: Order): {
  hasValidProductCosts: boolean;
  hasValidShippingCosts: boolean;
} {
  const hasValidProductCosts = order.shipments.every(
    (shipment) => shipment.hasValidProductCost
  );
  const hasValidShippingCosts = order.shipments.every(
    (shipment) => shipment.hasValidShippingCost
  );

  return { hasValidProductCosts, hasValidShippingCosts };
}

/**
 * Aggrega i valori delle spedizioni per ottenere i totali dell'ordine
 */
export function aggregateShipments(shipments: OrderShipment[]): {
  revenue: Order['revenue'];
  costs: Order['costs'];
  margin: Order['margin'];
} {
  const revenue = {
    productValue: 0,
    shippingValue: 0,
    discounts: 0,
    total: 0,
  };

  const costs = {
    productCost: 0,
    shippingCost: 0,
    commissions: 0,
    total: 0,
  };

  // Somma tutti i valori delle spedizioni
  shipments.forEach((shipment) => {
    revenue.productValue += shipment.revenue.productValue;
    revenue.shippingValue += shipment.revenue.shippingValue;
    revenue.discounts += shipment.revenue.discounts;
    revenue.total += shipment.revenue.total;

    costs.productCost += shipment.costs.productCost;
    costs.shippingCost += shipment.costs.shippingCost;
    costs.commissions += shipment.costs.commissions;
    costs.total += shipment.costs.total;
  });

  // Calcola il margine aggregato
  const marginValue = calculateMarginValue(revenue.total, costs.total);
  const marginPercentage = calculateMarginPercentage(marginValue, revenue.total);

  return {
    revenue,
    costs,
    margin: {
      value: marginValue,
      percentage: marginPercentage,
    },
  };
}

/**
 * Calcola le commissioni basate sul valore del prodotto e della transazione
 * Questa è una funzione di esempio - i parametri dipendono dalle tue esigenze
 */
export function calculateCommissions(
  productValue: number,
  totalRevenue: number,
  marketplace: string
): number {
  // Percentuali di esempio - da configurare in base al marketplace
  const marketplaceRates: Record<string, number> = {
    Amazon: 0.15, // 15%
    eBay: 0.10, // 10%
    'Sito Web': 0.0, // 0%
    Shopify: 0.0, // 0%
  };

  // Payment gateway rate (es. PayPal, Stripe)
  const paymentGatewayRate = 0.029; // 2.9%
  const fixedFee = 0.30; // €0.30

  const marketplaceRate = marketplaceRates[marketplace] || 0;
  const marketplaceFee = productValue * marketplaceRate;
  const paymentFee = totalRevenue * paymentGatewayRate + fixedFee;

  return marketplaceFee + paymentFee;
}

/**
 * Formatta una data ISO in formato leggibile
 */
export function formatDate(isoDate: string | null): string {
  if (!isoDate) return '-';

  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Formatta una data ISO in formato data semplice (senza ora)
 */
export function formatDateSimple(isoDate: string | null): string {
  if (!isoDate) return '-';

  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Converte una data in formato YYYY-MM-DD per input HTML
 */
export function toInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Ottiene la data di inizio e fine del mese corrente
 */
export function getCurrentMonthRange(): { from: string; to: string } {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    from: toInputDate(firstDay),
    to: toInputDate(lastDay),
  };
}

/**
 * Filtra un array di ordini in base a una query di ricerca testuale
 */
export function filterOrdersBySearch(orders: Order[], query: string): Order[] {
  if (!query.trim()) return orders;

  const lowerQuery = query.toLowerCase();

  return orders.filter((order) => {
    // Cerca nell'ID ordine
    if (order.id.toLowerCase().includes(lowerQuery)) return true;

    // Cerca nel nome cliente
    if (order.customerName.toLowerCase().includes(lowerQuery)) return true;

    // Cerca nei tracking numbers delle spedizioni
    const hasMatchingTracking = order.shipments.some(
      (shipment) =>
        shipment.trackingNumber &&
        shipment.trackingNumber.toLowerCase().includes(lowerQuery)
    );
    if (hasMatchingTracking) return true;

    return false;
  });
}

/**
 * Ordina gli ordini per margine (decrescente o crescente)
 */
export function sortOrdersByMargin(
  orders: Order[],
  direction: 'asc' | 'desc' = 'desc'
): Order[] {
  return [...orders].sort((a, b) => {
    if (direction === 'desc') {
      return b.margin.value - a.margin.value;
    }
    return a.margin.value - b.margin.value;
  });
}

/**
 * Ordina gli ordini per data
 */
export function sortOrdersByDate(
  orders: Order[],
  direction: 'asc' | 'desc' = 'desc'
): Order[] {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.orderDate).getTime();
    const dateB = new Date(b.orderDate).getTime();

    if (direction === 'desc') {
      return dateB - dateA;
    }
    return dateA - dateB;
  });
}

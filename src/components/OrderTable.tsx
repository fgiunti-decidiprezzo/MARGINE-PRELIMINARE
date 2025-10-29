/**
 * Componente tabella per visualizzare ordini e spedizioni
 */

import React, { useState } from 'react';
import type { Order, OrderShipment } from '@/types/order.types';
import {
  formatCurrency,
  formatPercentage,
  getMarginStatus,
  formatDateSimple,
} from '@/utils/calculations';
import './OrderTable.css';

interface OrderTableProps {
  /** Lista degli ordini da visualizzare */
  orders: Order[];
  /** Indica se i dati sono in caricamento */
  isLoading?: boolean;
}

interface OrderRowProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

interface ShipmentRowProps {
  shipment: OrderShipment;
}

/**
 * Componente per una singola riga di spedizione (figlio)
 */
const ShipmentRow: React.FC<ShipmentRowProps> = ({ shipment }) => {
  const marginStatus = getMarginStatus(shipment.margin.value);
  const marginClass = `${marginStatus}-value`;

  const productCostClass = shipment.hasValidProductCost
    ? 'cost-tag positive'
    : 'cost-tag negative';
  const shippingCostClass = shipment.hasValidShippingCost
    ? 'cost-tag positive'
    : 'cost-tag negative';

  return (
    <tr className="row-child">
      <td></td>
      <td>{shipment.id}</td>
      <td>{shipment.marketplace}</td>
      <td>{shipment.customerName}</td>
      <td>{shipment.trackingNumber || '-'}</td>
      <td>{formatCurrency(shipment.revenue.productValue)}</td>
      <td>{formatCurrency(shipment.revenue.shippingValue)}</td>
      <td>{formatCurrency(shipment.revenue.discounts)}</td>
      <td>{formatCurrency(shipment.revenue.total)}</td>
      <td>
        <span className={productCostClass}>
          {formatCurrency(shipment.costs.productCost)}
        </span>
      </td>
      <td>
        <span className={shippingCostClass}>
          {formatCurrency(shipment.costs.shippingCost)}
        </span>
      </td>
      <td>{formatCurrency(shipment.costs.commissions)}</td>
      <td>{formatCurrency(shipment.costs.total)}</td>
      <td className={marginClass}>
        {shipment.margin.value >= 0 ? '+' : ''}
        {formatCurrency(shipment.margin.value)} ({formatPercentage(shipment.margin.percentage)})
      </td>
    </tr>
  );
};

/**
 * Componente per una singola riga di ordine (padre)
 */
const OrderRow: React.FC<OrderRowProps> = ({ order, isExpanded, onToggle }) => {
  const marginStatus = getMarginStatus(order.margin.value);
  const marginClass = `${marginStatus}-value`;

  const productCostClass = order.hasValidProductCosts ? 'cost-tag positive' : 'cost-tag negative';
  const shippingCostClass = order.hasValidShippingCosts
    ? 'cost-tag positive'
    : 'cost-tag negative';

  const hasShipments = order.shipments.length > 0;
  const toggleIcon = hasShipments ? (isExpanded ? '▼' : '►') : '';

  return (
    <>
      <tr className="row-parent">
        <td>
          {hasShipments && (
            <span className="toggle-icon" onClick={onToggle}>
              {toggleIcon}
            </span>
          )}
        </td>
        <td>
          <strong>{order.id}</strong>
          <div className="order-date">{formatDateSimple(order.orderDate)}</div>
        </td>
        <td>{order.marketplace}</td>
        <td>{order.customerName}</td>
        <td>-</td>
        <td>{formatCurrency(order.revenue.productValue)}</td>
        <td>{formatCurrency(order.revenue.shippingValue)}</td>
        <td>{formatCurrency(order.revenue.discounts)}</td>
        <td>
          <strong>{formatCurrency(order.revenue.total)}</strong>
        </td>
        <td>
          <span className={productCostClass}>{formatCurrency(order.costs.productCost)}</span>
        </td>
        <td>
          <span className={shippingCostClass}>{formatCurrency(order.costs.shippingCost)}</span>
        </td>
        <td>{formatCurrency(order.costs.commissions)}</td>
        <td>{formatCurrency(order.costs.total)}</td>
        <td className={marginClass}>
          <strong>
            {order.margin.value >= 0 ? '+' : ''}
            {formatCurrency(order.margin.value)} ({formatPercentage(order.margin.percentage)})
          </strong>
        </td>
      </tr>

      {/* Righe delle spedizioni (visibili solo se espanse) */}
      {isExpanded &&
        order.shipments.map((shipment) => (
          <ShipmentRow key={shipment.id} shipment={shipment} />
        ))}
    </>
  );
};

/**
 * Componente principale della tabella
 */
export const OrderTable: React.FC<OrderTableProps> = ({ orders, isLoading = false }) => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  /**
   * Toggle espansione/collasso di un ordine
   */
  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  /**
   * Espandi tutti gli ordini
   */
  const expandAll = () => {
    const allOrderIds = orders.map((order) => order.id);
    setExpandedOrders(new Set(allOrderIds));
  };

  /**
   * Collassa tutti gli ordini
   */
  const collapseAll = () => {
    setExpandedOrders(new Set());
  };

  if (isLoading) {
    return (
      <div className="table-container">
        <div className="loading-message">Caricamento in corso...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-message">Nessun ordine trovato</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-actions">
        <button type="button" onClick={expandAll} className="btn-table-action">
          Espandi tutti
        </button>
        <button type="button" onClick={collapseAll} className="btn-table-action">
          Collassa tutti
        </button>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th style={{ width: '30px' }}></th>
              <th>ID Ordine</th>
              <th>Marketplace</th>
              <th>Cliente</th>
              <th>Tracking</th>
              <th>Val. Prodotto</th>
              <th>Val. Sped.</th>
              <th>Sconti</th>
              <th>Tot. Incassato</th>
              <th>Costo Prod.</th>
              <th>Costo Sped.</th>
              <th>Commissioni</th>
              <th>Tot. Costi</th>
              <th>Margine</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                isExpanded={expandedOrders.has(order.id)}
                onToggle={() => toggleOrder(order.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

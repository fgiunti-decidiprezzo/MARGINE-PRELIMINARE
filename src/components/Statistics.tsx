/**
 * Componente per visualizzare le statistiche aggregate
 */

import React from 'react';
import type { OrderStatistics } from '@/types/order.types';
import { formatCurrency, formatPercentage } from '@/utils/calculations';
import './Statistics.css';

interface StatisticsProps {
  /** Dati statistici da visualizzare */
  statistics: OrderStatistics;
  /** Indica se i dati sono in caricamento */
  isLoading?: boolean;
}

interface StatBoxProps {
  label: string;
  value: string | number;
  type?: 'positive' | 'negative' | 'neutral';
  isLoading?: boolean;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, type = 'neutral', isLoading }) => {
  return (
    <div className={`stat-box ${type}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{isLoading ? '...' : value}</div>
    </div>
  );
};

export const Statistics: React.FC<StatisticsProps> = ({ statistics, isLoading = false }) => {
  const {
    totalOrders,
    profitableOrders,
    profitablePercentage,
    losingOrders,
    losingPercentage,
    totalMargin,
    totalRevenue,
  } = statistics;

  // Determina il tipo di visualizzazione per il margine totale
  const marginType = totalMargin > 0 ? 'positive' : totalMargin < 0 ? 'negative' : 'neutral';

  return (
    <div className="stats-section">
      <h3>Riepilogo</h3>
      <div className="stats-grid">
        <StatBox
          label="Ordini Totali"
          value={totalOrders}
          type="neutral"
          isLoading={isLoading}
        />

        <StatBox
          label="In Profitto"
          value={`${profitableOrders} (${formatPercentage(profitablePercentage, 0)})`}
          type="positive"
          isLoading={isLoading}
        />

        <StatBox
          label="In Perdita"
          value={`${losingOrders} (${formatPercentage(losingPercentage, 0)})`}
          type="negative"
          isLoading={isLoading}
        />

        <StatBox
          label="Margine Totale"
          value={`${totalMargin >= 0 ? '+' : ''}${formatCurrency(totalMargin)}`}
          type={marginType}
          isLoading={isLoading}
        />

        <StatBox
          label="Valore Ordini"
          value={formatCurrency(totalRevenue)}
          type="neutral"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

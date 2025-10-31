import { OrderStatistics } from '../types';

interface StatisticsProps {
  statistics: OrderStatistics;
}

export default function Statistics({ statistics }: StatisticsProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-blue-900">📈 Statistiche</h2>

      <div className="space-y-4">
        {/* Total Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-xs text-gray-600 mb-1">Ordini Totali</div>
          <div className="text-2xl font-bold text-gray-900">{statistics.totalOrders}</div>
        </div>

        {/* Profitable Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-xs text-gray-600 mb-1">In Profitto</div>
          <div className="text-2xl font-bold text-green-600">
            {statistics.profitableOrders} ({statistics.profitablePercentage.toFixed(1)}%)
          </div>
        </div>

        {/* Losing Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-xs text-gray-600 mb-1">In Perdita</div>
          <div className="text-2xl font-bold text-red-600">
            {statistics.losingOrders} ({statistics.losingPercentage.toFixed(1)}%)
          </div>
        </div>

        {/* Total Margin */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-lg shadow-lg">
          <div className="text-xs text-purple-100 mb-1">Margine Totale</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(statistics.totalMargin)}</div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-xs text-gray-600 mb-1">Incassato</div>
          <div className="text-xl font-bold text-gray-900">{formatCurrency(statistics.totalRevenue)}</div>
        </div>

        {/* Total Costs */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-xs text-gray-600 mb-1">Costi Totali</div>
          <div className="text-xl font-bold text-gray-900">{formatCurrency(statistics.totalCosts)}</div>
        </div>
      </div>
    </div>
  );
}

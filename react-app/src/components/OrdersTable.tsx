import { Order } from '../types';

interface OrdersTableProps {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

export default function OrdersTable({ orders, setOrders }: OrdersTableProps) {
  const toggleExpand = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, isExpanded: !order.isExpanded } : order
      )
    );
  };

  const getRowClass = (margin: number, isShipment: boolean = false): string => {
    if (margin > 0) return isShipment ? 'bg-green-50' : 'bg-green-100';
    if (margin < 0) return isShipment ? 'bg-red-50' : 'bg-red-100';
    return isShipment ? 'bg-gray-50' : 'bg-gray-100';
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('it-IT');
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-800 text-white sticky top-0 z-10">
          <tr>
            <th className="px-2 py-3 text-left"></th>
            <th className="px-2 py-3 text-left">ID</th>
            <th className="px-2 py-3 text-left">Marketplace</th>
            <th className="px-2 py-3 text-left">Cliente</th>
            <th className="px-2 py-3 text-left">Data</th>
            <th className="px-2 py-3 text-left">Fornitore</th>
            <th className="px-2 py-3 text-left">Magazzino</th>
            <th className="px-2 py-3 text-left">Corriere</th>
            <th className="px-2 py-3 text-right">Val.Prod</th>
            <th className="px-2 py-3 text-right">Val.Sped</th>
            <th className="px-2 py-3 text-right">Sconti</th>
            <th className="px-2 py-3 text-right">Incassato</th>
            <th className="px-2 py-3 text-right">C.Prod</th>
            <th className="px-2 py-3 text-right">C.Sped</th>
            <th className="px-2 py-3 text-right">Comm.</th>
            <th className="px-2 py-3 text-right">Costi Tot</th>
            <th className="px-2 py-3 text-right">Margine €</th>
            <th className="px-2 py-3 text-right">Margine %</th>
            <th className="px-2 py-3 text-center">C.Prod</th>
            <th className="px-2 py-3 text-center">C.Sped</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <>
              <tr
                key={order.id}
                className={`${getRowClass(order.margin.value)} font-bold border-b border-gray-300 hover:opacity-80 transition-opacity`}
              >
                <td className="px-2 py-3">
                  {order.shipments.length > 0 && (
                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="text-lg hover:scale-110 transition-transform"
                    >
                      {order.isExpanded ? '▼' : '▶'}
                    </button>
                  )}
                </td>
                <td className="px-2 py-3">{order.id}</td>
                <td className="px-2 py-3">{order.marketplace}</td>
                <td className="px-2 py-3">{order.customerName}</td>
                <td className="px-2 py-3">{formatDate(order.orderDate)}</td>
                <td className="px-2 py-3">{order.supplier}</td>
                <td className="px-2 py-3">{order.warehouse}</td>
                <td className="px-2 py-3">{order.courier}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.revenue.productValue)}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.revenue.shippingValue)}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.revenue.discounts)}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.revenue.total)}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.costs.productCost)}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.costs.shippingCost)}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.costs.commissions)}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.costs.total)}</td>
                <td className="px-2 py-3 text-right">{formatCurrency(order.margin.value)}</td>
                <td className="px-2 py-3 text-right">{order.margin.percentage.toFixed(2)}%</td>
                <td className="px-2 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${order.hasValidProductCost ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                    {order.hasValidProductCost ? 'OK' : 'KO'}
                  </span>
                </td>
                <td className="px-2 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${order.hasValidShippingCost ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                    {order.hasValidShippingCost ? 'OK' : 'KO'}
                  </span>
                </td>
              </tr>

              {order.isExpanded &&
                order.shipments.map((shipment, index) => (
                  <tr
                    key={`${order.id}-shipment-${index}`}
                    className={`${getRowClass(shipment.margin.value, true)} text-xs border-b border-gray-200`}
                  >
                    <td className="px-2 py-2 pl-8">→</td>
                    <td className="px-2 py-2">{shipment.trackingNumber}</td>
                    <td className="px-2 py-2">{shipment.marketplace}</td>
                    <td className="px-2 py-2">{shipment.customerName}</td>
                    <td className="px-2 py-2">{formatDate(shipment.shippingDate)}</td>
                    <td className="px-2 py-2">-</td>
                    <td className="px-2 py-2">-</td>
                    <td className="px-2 py-2">{shipment.courier}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.revenue.productValue)}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.revenue.shippingValue)}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.revenue.discounts)}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.revenue.total)}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.costs.productCost)}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.costs.shippingCost)}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.costs.commissions)}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.costs.total)}</td>
                    <td className="px-2 py-2 text-right">{formatCurrency(shipment.margin.value)}</td>
                    <td className="px-2 py-2 text-right">{shipment.margin.percentage.toFixed(2)}%</td>
                    <td className="px-2 py-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${shipment.hasValidProductCost ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                        {shipment.hasValidProductCost ? 'OK' : 'KO'}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${shipment.hasValidShippingCost ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                        {shipment.hasValidShippingCost ? 'OK' : 'KO'}
                      </span>
                    </td>
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

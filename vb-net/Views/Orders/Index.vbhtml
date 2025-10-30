@Code
    ViewData("Title") = "Analisi Margine Operativo"
End Code

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewData("Title") - Order Margin Analysis</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            padding: 20px;
            background-color: #f8f9fa;
        }

        .header {
            background: white;
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
            border: 1px solid #e1e4e8;
        }

        h1 {
            margin-bottom: 20px;
            color: #24292e;
            font-size: 24px;
            font-weight: 600;
        }

        .header-content {
            display: flex;
            gap: 20px;
        }

        .filters-section {
            flex: 2;
            min-width: 0;
        }

        .filters-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 12px;
        }

        .stats-section {
            flex: 1;
            min-width: 280px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .filter-group label {
            font-size: 12px;
            font-weight: 600;
            color: #586069;
            text-transform: uppercase;
        }

        .filter-group input,
        .filter-group select {
            padding: 8px 12px;
            border: 1px solid #d1d5da;
            border-radius: 3px;
            font-size: 14px;
            background: white;
        }

        .btn-search {
            width: 100%;
            padding: 8px 16px;
            background-color: #0366d6;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
        }

        .btn-search:hover {
            background-color: #0256c7;
        }

        .stat-box {
            background: white;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #e1e4e8;
        }

        .stat-box.positive { border-left: 3px solid #28a745; }
        .stat-box.negative { border-left: 3px solid #d73a49; }
        .stat-box.neutral { border-left: 3px solid #6a737d; }

        .stat-label {
            font-size: 11px;
            color: #586069;
            margin-bottom: 4px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .stat-value {
            font-size: 20px;
            font-weight: 600;
            color: #24292e;
        }

        .stat-box.positive .stat-value { color: #28a745; }
        .stat-box.negative .stat-value { color: #d73a49; }

        .table-container {
            background: white;
            border-radius: 4px;
            padding: 0;
            border: 1px solid #e1e4e8;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }

        thead {
            background-color: #f6f8fa;
        }

        th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            border-bottom: 1px solid #e1e4e8;
            white-space: nowrap;
            color: #24292e;
            font-size: 12px;
            text-transform: uppercase;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #e1e4e8;
        }

        .row-parent {
            background-color: #f6f8fa;
            font-weight: 600;
        }

        .row-parent:hover { background-color: #ebeef1; }
        .row-parent td:first-child { border-left: 4px solid #0366d6; }

        .row-child {
            background-color: white;
            font-size: 13px;
        }

        .row-child td:first-child {
            padding-left: 40px;
            border-left: 4px solid #e1e4e8;
        }

        .row-child:hover { background-color: #f6f8fa; }

        .negative-value {
            color: #d73a49;
            font-weight: 600;
        }

        .positive-value {
            color: #28a745;
            font-weight: 600;
        }

        .neutral-value {
            color: #6a737d;
            font-weight: 600;
        }

        .cost-tag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            margin: 2px;
            white-space: nowrap;
        }

        .cost-tag.positive {
            background-color: #dcffe4;
            color: #22863a;
        }

        .cost-tag.negative {
            background-color: #ffdce0;
            color: #cb2431;
        }

        .toggle-icon {
            cursor: pointer;
            display: inline-block;
            width: 20px;
            text-align: center;
            color: #586069;
            font-size: 12px;
            user-select: none;
        }

        .collapsed {
            display: none;
        }

        .loading {
            text-align: center;
            padding: 40px;
            color: #586069;
        }

        h3 {
            font-size: 14px;
            font-weight: 600;
            color: #24292e;
            margin-bottom: 12px;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Analisi Margine Operativo Lordo Preliminare</h1>

        <div class="header-content">
            <div class="filters-section">
                <h3>Filtri</h3>
                <div class="filters-grid">
                    <div class="filter-group">
                        <label>Ricerca</label>
                        <input type="text" id="searchQuery" placeholder="Ordine, cliente, tracking...">
                    </div>

                    <div class="filter-group">
                        <label>Data Da</label>
                        <input type="date" id="dateFrom">
                    </div>

                    <div class="filter-group">
                        <label>Data A</label>
                        <input type="date" id="dateTo">
                    </div>

                    <div class="filter-group">
                        <label>Marketplace</label>
                        <select id="marketplace">
                            <option value="">Tutti</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label>Fornitore</label>
                        <select id="supplier">
                            <option value="">Tutti</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label>Logistica</label>
                        <select id="warehouse">
                            <option value="">Tutti</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label>Corriere</label>
                        <select id="courier">
                            <option value="">Tutti</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label>Costo Prodotto</label>
                        <select id="productCostStatus">
                            <option value="">Tutti</option>
                            <option value="ok">OK</option>
                            <option value="ko">KO</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label>Costo Spedizione</label>
                        <select id="shippingCostStatus">
                            <option value="">Tutti</option>
                            <option value="ok">OK</option>
                            <option value="ko">KO</option>
                        </select>
                    </div>
                </div>
                <button class="btn-search" onclick="loadOrders()">Cerca</button>
            </div>

            <div class="stats-section">
                <h3>Riepilogo</h3>
                <div class="stats-grid" id="statistics">
                    <div class="stat-box neutral">
                        <div class="stat-label">Ordini Totali</div>
                        <div class="stat-value">-</div>
                    </div>
                    <div class="stat-box positive">
                        <div class="stat-label">In Profitto</div>
                        <div class="stat-value">-</div>
                    </div>
                    <div class="stat-box negative">
                        <div class="stat-label">In Perdita</div>
                        <div class="stat-value">-</div>
                    </div>
                    <div class="stat-box positive">
                        <div class="stat-label">Margine Totale</div>
                        <div class="stat-value">-</div>
                    </div>
                    <div class="stat-box neutral">
                        <div class="stat-label">Valore Ordini</div>
                        <div class="stat-value">-</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th style="width: 30px;"></th>
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
            <tbody id="ordersTable">
                <tr>
                    <td colspan="14" class="loading">Caricamento...</td>
                </tr>
            </tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        // Formatta valuta
        function formatCurrency(value) {
            return '€ ' + Number(value).toFixed(2).replace('.', ',');
        }

        // Formatta percentuale
        function formatPercentage(value) {
            return Number(value).toFixed(1) + '%';
        }

        // Carica opzioni filtri
        function loadFilterOptions() {
            $.ajax({
                url: '@Url.Action("GetFilterOptions", "Orders")',
                type: 'GET',
                success: function(data) {
                    // Popola marketplace
                    var marketplaceSelect = $('#marketplace');
                    data.Marketplaces.forEach(function(m) {
                        marketplaceSelect.append('<option value="' + m + '">' + m + '</option>');
                    });

                    // Popola fornitori
                    var supplierSelect = $('#supplier');
                    data.Suppliers.forEach(function(s) {
                        supplierSelect.append('<option value="' + s + '">' + s + '</option>');
                    });

                    // Popola magazzini
                    var warehouseSelect = $('#warehouse');
                    data.Warehouses.forEach(function(w) {
                        warehouseSelect.append('<option value="' + w + '">' + w + '</option>');
                    });

                    // Popola corrieri
                    var courierSelect = $('#courier');
                    data.Couriers.forEach(function(c) {
                        courierSelect.append('<option value="' + c + '">' + c + '</option>');
                    });
                }
            });
        }

        // Carica ordini
        function loadOrders() {
            var filters = {
                searchQuery: $('#searchQuery').val(),
                dateFrom: $('#dateFrom').val(),
                dateTo: $('#dateTo').val(),
                marketplace: $('#marketplace').val(),
                supplier: $('#supplier').val(),
                warehouse: $('#warehouse').val(),
                courier: $('#courier').val(),
                productCostStatus: $('#productCostStatus').val(),
                shippingCostStatus: $('#shippingCostStatus').val()
            };

            $.ajax({
                url: '@Url.Action("GetOrders", "Orders")',
                type: 'GET',
                data: filters,
                success: function(data) {
                    renderOrders(data.orders);
                    renderStatistics(data.statistics);
                },
                error: function() {
                    $('#ordersTable').html('<tr><td colspan="14" class="loading">Errore nel caricamento dei dati</td></tr>');
                }
            });
        }

        // Renderizza statistiche
        function renderStatistics(stats) {
            var marginType = stats.TotalMargin > 0 ? 'positive' : (stats.TotalMargin < 0 ? 'negative' : 'neutral');
            var marginSign = stats.TotalMargin >= 0 ? '+' : '';

            var html = '<div class="stat-box neutral"><div class="stat-label">Ordini Totali</div><div class="stat-value">' + stats.TotalOrders + '</div></div>';
            html += '<div class="stat-box positive"><div class="stat-label">In Profitto</div><div class="stat-value">' + stats.ProfitableOrders + ' (' + formatPercentage(stats.ProfitablePercentage) + ')</div></div>';
            html += '<div class="stat-box negative"><div class="stat-label">In Perdita</div><div class="stat-value">' + stats.LosingOrders + ' (' + formatPercentage(stats.LosingPercentage) + ')</div></div>';
            html += '<div class="stat-box ' + marginType + '"><div class="stat-label">Margine Totale</div><div class="stat-value">' + marginSign + formatCurrency(stats.TotalMargin) + '</div></div>';
            html += '<div class="stat-box neutral"><div class="stat-label">Valore Ordini</div><div class="stat-value">' + formatCurrency(stats.TotalRevenue) + '</div></div>';

            $('#statistics').html(html);
        }

        // Renderizza ordini
        function renderOrders(orders) {
            if (orders.length === 0) {
                $('#ordersTable').html('<tr><td colspan="14" class="loading">Nessun ordine trovato</td></tr>');
                return;
            }

            var html = '';
            orders.forEach(function(order) {
                var marginClass = order.Margin.Value > 0 ? 'positive-value' : (order.Margin.Value < 0 ? 'negative-value' : 'neutral-value');
                var marginSign = order.Margin.Value >= 0 ? '+' : '';
                var productCostClass = order.HasValidProductCosts ? 'cost-tag positive' : 'cost-tag negative';
                var shippingCostClass = order.HasValidShippingCosts ? 'cost-tag positive' : 'cost-tag negative';
                var toggleIcon = order.Shipments.length > 0 ? '▶' : '';

                html += '<tr class="row-parent">';
                html += '<td><span class="toggle-icon" onclick="toggleChildren(\'' + order.Id + '\')">' + toggleIcon + '</span></td>';
                html += '<td><strong>' + order.Id + '</strong></td>';
                html += '<td>' + order.Marketplace + '</td>';
                html += '<td>' + order.CustomerName + '</td>';
                html += '<td>-</td>';
                html += '<td>' + formatCurrency(order.Revenue.ProductValue) + '</td>';
                html += '<td>' + formatCurrency(order.Revenue.ShippingValue) + '</td>';
                html += '<td>' + formatCurrency(order.Revenue.Discounts) + '</td>';
                html += '<td><strong>' + formatCurrency(order.Revenue.Total) + '</strong></td>';
                html += '<td><span class="' + productCostClass + '">' + formatCurrency(order.Costs.ProductCost) + '</span></td>';
                html += '<td><span class="' + shippingCostClass + '">' + formatCurrency(order.Costs.ShippingCost) + '</span></td>';
                html += '<td>' + formatCurrency(order.Costs.Commissions) + '</td>';
                html += '<td>' + formatCurrency(order.Costs.Total) + '</td>';
                html += '<td class="' + marginClass + '"><strong>' + marginSign + formatCurrency(order.Margin.Value) + ' (' + formatPercentage(order.Margin.Percentage) + ')</strong></td>';
                html += '</tr>';

                // Spedizioni
                order.Shipments.forEach(function(shipment) {
                    var sMarginClass = shipment.Margin.Value > 0 ? 'positive-value' : (shipment.Margin.Value < 0 ? 'negative-value' : 'neutral-value');
                    var sMarginSign = shipment.Margin.Value >= 0 ? '+' : '';
                    var sProdCostClass = shipment.HasValidProductCost ? 'cost-tag positive' : 'cost-tag negative';
                    var sShipCostClass = shipment.HasValidShippingCost ? 'cost-tag positive' : 'cost-tag negative';

                    html += '<tr class="row-child child-of-' + order.Id + ' collapsed">';
                    html += '<td></td>';
                    html += '<td>' + shipment.Id + '</td>';
                    html += '<td>' + shipment.Marketplace + '</td>';
                    html += '<td>' + shipment.CustomerName + '</td>';
                    html += '<td>' + (shipment.TrackingNumber || '-') + '</td>';
                    html += '<td>' + formatCurrency(shipment.Revenue.ProductValue) + '</td>';
                    html += '<td>' + formatCurrency(shipment.Revenue.ShippingValue) + '</td>';
                    html += '<td>' + formatCurrency(shipment.Revenue.Discounts) + '</td>';
                    html += '<td>' + formatCurrency(shipment.Revenue.Total) + '</td>';
                    html += '<td><span class="' + sProdCostClass + '">' + formatCurrency(shipment.Costs.ProductCost) + '</span></td>';
                    html += '<td><span class="' + sShipCostClass + '">' + formatCurrency(shipment.Costs.ShippingCost) + '</span></td>';
                    html += '<td>' + formatCurrency(shipment.Costs.Commissions) + '</td>';
                    html += '<td>' + formatCurrency(shipment.Costs.Total) + '</td>';
                    html += '<td class="' + sMarginClass + '">' + sMarginSign + formatCurrency(shipment.Margin.Value) + ' (' + formatPercentage(shipment.Margin.Percentage) + ')</td>';
                    html += '</tr>';
                });
            });

            $('#ordersTable').html(html);
        }

        // Toggle spedizioni
        function toggleChildren(orderId) {
            var children = $('.child-of-' + orderId);
            children.toggleClass('collapsed');

            var icon = $('span.toggle-icon').filter(function() {
                return $(this).parent().parent().find('strong').text() === orderId;
            });

            if (children.hasClass('collapsed')) {
                icon.text('▶');
            } else {
                icon.text('▼');
            }
        }

        // Init al caricamento pagina
        $(document).ready(function() {
            loadFilterOptions();
            loadOrders();
        });
    </script>
</body>
</html>

Imports System.Windows.Forms
Imports OrderMarginAnalysis.Models
Imports OrderMarginAnalysis.Services

Public Class MainForm
    Private mockDataService As MockDataService
    Private currentOrders As List(Of Order)
    Private expandedOrderIds As New HashSet(Of String)()

    Public Sub New()
        InitializeComponent()
        mockDataService = New MockDataService()
    End Sub

    Private Sub MainForm_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' Inizializza i ComboBox
        InitializeFilterComboBoxes()

        ' Carica i dati iniziali
        LoadOrders()
    End Sub

    Private Sub InitializeFilterComboBoxes()
        ' Marketplace
        cmbMarketplace.Items.Add("Tutti")
        For Each marketplace In mockDataService.GetMarketplaces()
            cmbMarketplace.Items.Add(marketplace)
        Next
        cmbMarketplace.SelectedIndex = 0

        ' Supplier
        cmbSupplier.Items.Add("Tutti")
        For Each supplier In mockDataService.GetSuppliers()
            cmbSupplier.Items.Add(supplier)
        Next
        cmbSupplier.SelectedIndex = 0

        ' Warehouse
        cmbWarehouse.Items.Add("Tutti")
        For Each warehouse In mockDataService.GetWarehouses()
            cmbWarehouse.Items.Add(warehouse)
        Next
        cmbWarehouse.SelectedIndex = 0

        ' Courier
        cmbCourier.Items.Add("Tutti")
        For Each courier In mockDataService.GetCouriers()
            cmbCourier.Items.Add(courier)
        Next
        cmbCourier.SelectedIndex = 0

        ' Cost Status
        cmbProductCostStatus.Items.AddRange(New String() {"Tutti", "OK", "KO"})
        cmbProductCostStatus.SelectedIndex = 0

        cmbShippingCostStatus.Items.AddRange(New String() {"Tutti", "OK", "KO"})
        cmbShippingCostStatus.SelectedIndex = 0
    End Sub

    Private Sub LoadOrders()
        ' Costruisci i filtri
        Dim filters As New OrderFilters() With {
            .SearchQuery = txtSearch.Text.Trim(),
            .DateFrom = If(chkDateFrom.Checked, dtpDateFrom.Value, Nothing),
            .DateTo = If(chkDateTo.Checked, dtpDateTo.Value, Nothing),
            .Marketplace = If(cmbMarketplace.SelectedIndex > 0, cmbMarketplace.SelectedItem.ToString(), Nothing),
            .Supplier = If(cmbSupplier.SelectedIndex > 0, cmbSupplier.SelectedItem.ToString(), Nothing),
            .Warehouse = If(cmbWarehouse.SelectedIndex > 0, cmbWarehouse.SelectedItem.ToString(), Nothing),
            .Courier = If(cmbCourier.SelectedIndex > 0, cmbCourier.SelectedItem.ToString(), Nothing),
            .ProductCostStatus = If(cmbProductCostStatus.SelectedIndex > 0, cmbProductCostStatus.SelectedItem.ToString(), Nothing),
            .ShippingCostStatus = If(cmbShippingCostStatus.SelectedIndex > 0, cmbShippingCostStatus.SelectedItem.ToString(), Nothing)
        }

        ' Ottieni gli ordini filtrati
        currentOrders = mockDataService.GetOrders(filters)

        ' Ottieni le statistiche
        Dim stats = mockDataService.GetStatistics(currentOrders)

        ' Aggiorna le statistiche nell'UI
        UpdateStatistics(stats)

        ' Popola il DataGridView
        PopulateDataGridView()
    End Sub

    Private Sub UpdateStatistics(stats As OrderStatistics)
        lblTotalOrders.Text = $"Ordini Totali: {stats.TotalOrders}"
        lblProfitableOrders.Text = $"In Profitto: {stats.ProfitableOrders} ({stats.ProfitablePercentage:F1}%)"
        lblLosingOrders.Text = $"In Perdita: {stats.LosingOrders} ({stats.LosingPercentage:F1}%)"
        lblTotalMargin.Text = $"Margine Totale: {stats.TotalMargin:C2}"
        lblTotalRevenue.Text = $"Incassato: {stats.TotalRevenue:C2}"
        lblTotalCosts.Text = $"Costi Totali: {stats.TotalCosts:C2}"
    End Sub

    Private Sub PopulateDataGridView()
        dgvOrders.Rows.Clear()

        For Each order In currentOrders
            Dim isExpanded = expandedOrderIds.Contains(order.Id)

            ' Aggiungi la riga dell'ordine
            Dim orderRowIndex = dgvOrders.Rows.Add(
                If(order.Shipments.Count > 1, If(isExpanded, "▼", "▶"), ""),
                order.Id,
                order.Marketplace,
                order.CustomerName,
                order.OrderDate?.ToString("dd/MM/yyyy"),
                order.FulfillmentDate?.ToString("dd/MM/yyyy"),
                order.Supplier,
                order.Warehouse,
                order.Courier,
                order.Revenue.ProductValue,
                order.Revenue.ShippingValue,
                order.Revenue.Discounts,
                order.Revenue.Total,
                order.Costs.ProductCost,
                order.Costs.ShippingCost,
                order.Costs.Commissions,
                order.Costs.Total,
                order.Margin.Value,
                order.Margin.Percentage,
                If(order.HasValidProductCost, "OK", "KO"),
                If(order.HasValidShippingCost, "OK", "KO")
            )

            ' Colora la riga in base al margine
            Dim orderRow = dgvOrders.Rows(orderRowIndex)
            orderRow.DefaultCellStyle.BackColor = GetMarginColor(order.Margin.Value)
            orderRow.DefaultCellStyle.ForeColor = Color.Black
            orderRow.DefaultCellStyle.Font = New Font(dgvOrders.Font, FontStyle.Bold)
            orderRow.Tag = order ' Salva l'ordine nel Tag per riferimento

            ' Se l'ordine è espanso, mostra le spedizioni
            If isExpanded AndAlso order.Shipments.Count > 1 Then
                For Each shipment In order.Shipments
                    Dim shipmentRowIndex = dgvOrders.Rows.Add(
                        "  →",
                        shipment.TrackingNumber,
                        shipment.Marketplace,
                        shipment.CustomerName,
                        "",
                        shipment.ShippingDate?.ToString("dd/MM/yyyy"),
                        "",
                        "",
                        shipment.Courier,
                        shipment.Revenue.ProductValue,
                        shipment.Revenue.ShippingValue,
                        shipment.Revenue.Discounts,
                        shipment.Revenue.Total,
                        shipment.Costs.ProductCost,
                        shipment.Costs.ShippingCost,
                        shipment.Costs.Commissions,
                        shipment.Costs.Total,
                        shipment.Margin.Value,
                        shipment.Margin.Percentage,
                        If(shipment.HasValidProductCost, "OK", "KO"),
                        If(shipment.HasValidShippingCost, "OK", "KO")
                    )

                    Dim shipmentRow = dgvOrders.Rows(shipmentRowIndex)
                    shipmentRow.DefaultCellStyle.BackColor = GetMarginColor(shipment.Margin.Value, True)
                    shipmentRow.DefaultCellStyle.ForeColor = Color.Black
                    shipmentRow.Tag = shipment
                Next
            End If
        Next
    End Sub

    Private Function GetMarginColor(marginValue As Decimal, Optional isShipment As Boolean = False) As Color
        If marginValue > 0 Then
            Return If(isShipment, Color.LightGreen, Color.PaleGreen)
        ElseIf marginValue < 0 Then
            Return If(isShipment, Color.LightCoral, Color.LightPink)
        Else
            Return If(isShipment, Color.WhiteSmoke, Color.LightGray)
        End If
    End Function

    Private Sub btnSearch_Click(sender As Object, e As EventArgs) Handles btnSearch.Click
        LoadOrders()
    End Sub

    Private Sub btnReset_Click(sender As Object, e As EventArgs) Handles btnReset.Click
        ' Reset tutti i filtri
        txtSearch.Clear()
        chkDateFrom.Checked = False
        chkDateTo.Checked = False
        cmbMarketplace.SelectedIndex = 0
        cmbSupplier.SelectedIndex = 0
        cmbWarehouse.SelectedIndex = 0
        cmbCourier.SelectedIndex = 0
        cmbProductCostStatus.SelectedIndex = 0
        cmbShippingCostStatus.SelectedIndex = 0

        ' Ricarica i dati
        LoadOrders()
    End Sub

    Private Sub dgvOrders_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles dgvOrders.CellClick
        ' Se clicco sulla prima colonna e la riga contiene un ordine con multiple spedizioni
        If e.ColumnIndex = 0 AndAlso e.RowIndex >= 0 Then
            Dim row = dgvOrders.Rows(e.RowIndex)
            If TypeOf row.Tag Is Order Then
                Dim order = DirectCast(row.Tag, Order)
                If order.Shipments.Count > 1 Then
                    ' Toggle expand/collapse
                    If expandedOrderIds.Contains(order.Id) Then
                        expandedOrderIds.Remove(order.Id)
                    Else
                        expandedOrderIds.Add(order.Id)
                    End If
                    PopulateDataGridView()
                End If
            End If
        End If
    End Sub

    Private Sub dgvOrders_CellFormatting(sender As Object, e As DataGridViewCellFormattingEventArgs) Handles dgvOrders.CellFormatting
        ' Formatta le colonne currency
        If e.ColumnIndex >= 9 AndAlso e.ColumnIndex <= 18 AndAlso e.Value IsNot Nothing Then
            If e.ColumnIndex = 18 Then ' Percentage
                e.Value = $"{CDec(e.Value):F2}%"
                e.FormattingApplied = True
            ElseIf e.ColumnIndex <> 19 AndAlso e.ColumnIndex <> 20 Then ' Currency (escludi OK/KO)
                e.Value = $"€{CDec(e.Value):F2}"
                e.FormattingApplied = True
            End If
        End If

        ' Colora le celle OK/KO
        If (e.ColumnIndex = 19 Or e.ColumnIndex = 20) AndAlso e.Value IsNot Nothing Then
            If e.Value.ToString() = "KO" Then
                e.CellStyle.BackColor = Color.Orange
                e.CellStyle.ForeColor = Color.White
                e.CellStyle.Font = New Font(dgvOrders.Font, FontStyle.Bold)
            Else
                e.CellStyle.BackColor = Color.LightGreen
            End If
        End If
    End Sub

    Private Sub chkDateFrom_CheckedChanged(sender As Object, e As EventArgs) Handles chkDateFrom.CheckedChanged
        dtpDateFrom.Enabled = chkDateFrom.Checked
    End Sub

    Private Sub chkDateTo_CheckedChanged(sender As Object, e As EventArgs) Handles chkDateTo.CheckedChanged
        dtpDateTo.Enabled = chkDateTo.Checked
    End Sub
End Class

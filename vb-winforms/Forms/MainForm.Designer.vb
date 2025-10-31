<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class MainForm
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()>
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()>
    Private Sub InitializeComponent()
        Me.panelFilters = New System.Windows.Forms.Panel()
        Me.lblTitle = New System.Windows.Forms.Label()
        Me.lblSearch = New System.Windows.Forms.Label()
        Me.txtSearch = New System.Windows.Forms.TextBox()
        Me.lblDateFrom = New System.Windows.Forms.Label()
        Me.chkDateFrom = New System.Windows.Forms.CheckBox()
        Me.dtpDateFrom = New System.Windows.Forms.DateTimePicker()
        Me.lblDateTo = New System.Windows.Forms.Label()
        Me.chkDateTo = New System.Windows.Forms.CheckBox()
        Me.dtpDateTo = New System.Windows.Forms.DateTimePicker()
        Me.lblMarketplace = New System.Windows.Forms.Label()
        Me.cmbMarketplace = New System.Windows.Forms.ComboBox()
        Me.lblSupplier = New System.Windows.Forms.Label()
        Me.cmbSupplier = New System.Windows.Forms.ComboBox()
        Me.lblWarehouse = New System.Windows.Forms.Label()
        Me.cmbWarehouse = New System.Windows.Forms.ComboBox()
        Me.lblCourier = New System.Windows.Forms.Label()
        Me.cmbCourier = New System.Windows.Forms.ComboBox()
        Me.lblProductCostStatus = New System.Windows.Forms.Label()
        Me.cmbProductCostStatus = New System.Windows.Forms.ComboBox()
        Me.lblShippingCostStatus = New System.Windows.Forms.Label()
        Me.cmbShippingCostStatus = New System.Windows.Forms.ComboBox()
        Me.btnSearch = New System.Windows.Forms.Button()
        Me.btnReset = New System.Windows.Forms.Button()
        Me.panelStats = New System.Windows.Forms.Panel()
        Me.lblStatsTitle = New System.Windows.Forms.Label()
        Me.lblTotalOrders = New System.Windows.Forms.Label()
        Me.lblProfitableOrders = New System.Windows.Forms.Label()
        Me.lblLosingOrders = New System.Windows.Forms.Label()
        Me.lblTotalMargin = New System.Windows.Forms.Label()
        Me.lblTotalRevenue = New System.Windows.Forms.Label()
        Me.lblTotalCosts = New System.Windows.Forms.Label()
        Me.dgvOrders = New System.Windows.Forms.DataGridView()
        Me.colExpand = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colOrderId = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colMarketplace = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colCustomerName = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colOrderDate = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colFulfillmentDate = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colSupplier = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colWarehouse = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colCourier = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colProductValue = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colShippingValue = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colDiscounts = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colRevenueTotal = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colProductCost = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colShippingCost = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colCommissions = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colCostsTotal = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colMarginValue = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colMarginPercentage = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colProductCostStatus = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.colShippingCostStatus = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.panelFilters.SuspendLayout()
        Me.panelStats.SuspendLayout()
        CType(Me.dgvOrders, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'panelFilters
        '
        Me.panelFilters.BackColor = System.Drawing.Color.WhiteSmoke
        Me.panelFilters.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.panelFilters.Controls.Add(Me.btnReset)
        Me.panelFilters.Controls.Add(Me.btnSearch)
        Me.panelFilters.Controls.Add(Me.cmbShippingCostStatus)
        Me.panelFilters.Controls.Add(Me.lblShippingCostStatus)
        Me.panelFilters.Controls.Add(Me.cmbProductCostStatus)
        Me.panelFilters.Controls.Add(Me.lblProductCostStatus)
        Me.panelFilters.Controls.Add(Me.cmbCourier)
        Me.panelFilters.Controls.Add(Me.lblCourier)
        Me.panelFilters.Controls.Add(Me.cmbWarehouse)
        Me.panelFilters.Controls.Add(Me.lblWarehouse)
        Me.panelFilters.Controls.Add(Me.cmbSupplier)
        Me.panelFilters.Controls.Add(Me.lblSupplier)
        Me.panelFilters.Controls.Add(Me.cmbMarketplace)
        Me.panelFilters.Controls.Add(Me.lblMarketplace)
        Me.panelFilters.Controls.Add(Me.dtpDateTo)
        Me.panelFilters.Controls.Add(Me.chkDateTo)
        Me.panelFilters.Controls.Add(Me.lblDateTo)
        Me.panelFilters.Controls.Add(Me.dtpDateFrom)
        Me.panelFilters.Controls.Add(Me.chkDateFrom)
        Me.panelFilters.Controls.Add(Me.lblDateFrom)
        Me.panelFilters.Controls.Add(Me.txtSearch)
        Me.panelFilters.Controls.Add(Me.lblSearch)
        Me.panelFilters.Controls.Add(Me.lblTitle)
        Me.panelFilters.Dock = System.Windows.Forms.DockStyle.Top
        Me.panelFilters.Location = New System.Drawing.Point(0, 0)
        Me.panelFilters.Name = "panelFilters"
        Me.panelFilters.Size = New System.Drawing.Size(1600, 180)
        Me.panelFilters.TabIndex = 0
        '
        'lblTitle
        '
        Me.lblTitle.AutoSize = True
        Me.lblTitle.Font = New System.Drawing.Font("Segoe UI", 16.0!, System.Drawing.FontStyle.Bold)
        Me.lblTitle.Location = New System.Drawing.Point(12, 12)
        Me.lblTitle.Name = "lblTitle"
        Me.lblTitle.Size = New System.Drawing.Size(432, 30)
        Me.lblTitle.TabIndex = 0
        Me.lblTitle.Text = "Analisi Margine Preliminare Ordini"
        '
        'lblSearch
        '
        Me.lblSearch.AutoSize = True
        Me.lblSearch.Location = New System.Drawing.Point(12, 52)
        Me.lblSearch.Name = "lblSearch"
        Me.lblSearch.Size = New System.Drawing.Size(46, 13)
        Me.lblSearch.TabIndex = 1
        Me.lblSearch.Text = "Ricerca:"
        '
        'txtSearch
        '
        Me.txtSearch.Location = New System.Drawing.Point(12, 68)
        Me.txtSearch.Name = "txtSearch"
        Me.txtSearch.Size = New System.Drawing.Size(280, 20)
        Me.txtSearch.TabIndex = 2
        '
        'lblDateFrom
        '
        Me.lblDateFrom.AutoSize = True
        Me.lblDateFrom.Location = New System.Drawing.Point(12, 100)
        Me.lblDateFrom.Name = "lblDateFrom"
        Me.lblDateFrom.Size = New System.Drawing.Size(51, 13)
        Me.lblDateFrom.TabIndex = 3
        Me.lblDateFrom.Text = "Data Da:"
        '
        'chkDateFrom
        '
        Me.chkDateFrom.AutoSize = True
        Me.chkDateFrom.Location = New System.Drawing.Point(12, 118)
        Me.chkDateFrom.Name = "chkDateFrom"
        Me.chkDateFrom.Size = New System.Drawing.Size(15, 14)
        Me.chkDateFrom.TabIndex = 4
        '
        'dtpDateFrom
        '
        Me.dtpDateFrom.Enabled = False
        Me.dtpDateFrom.Format = System.Windows.Forms.DateTimePickerFormat.[Short]
        Me.dtpDateFrom.Location = New System.Drawing.Point(33, 115)
        Me.dtpDateFrom.Name = "dtpDateFrom"
        Me.dtpDateFrom.Size = New System.Drawing.Size(120, 20)
        Me.dtpDateFrom.TabIndex = 5
        '
        'lblDateTo
        '
        Me.lblDateTo.AutoSize = True
        Me.lblDateTo.Location = New System.Drawing.Point(165, 100)
        Me.lblDateTo.Name = "lblDateTo"
        Me.lblDateTo.Size = New System.Drawing.Size(46, 13)
        Me.lblDateTo.TabIndex = 6
        Me.lblDateTo.Text = "Data A:"
        '
        'chkDateTo
        '
        Me.chkDateTo.AutoSize = True
        Me.chkDateTo.Location = New System.Drawing.Point(165, 118)
        Me.chkDateTo.Name = "chkDateTo"
        Me.chkDateTo.Size = New System.Drawing.Size(15, 14)
        Me.chkDateTo.TabIndex = 7
        '
        'dtpDateTo
        '
        Me.dtpDateTo.Enabled = False
        Me.dtpDateTo.Format = System.Windows.Forms.DateTimePickerFormat.[Short]
        Me.dtpDateTo.Location = New System.Drawing.Point(186, 115)
        Me.dtpDateTo.Name = "dtpDateTo"
        Me.dtpDateTo.Size = New System.Drawing.Size(120, 20)
        Me.dtpDateTo.TabIndex = 8
        '
        'lblMarketplace
        '
        Me.lblMarketplace.AutoSize = True
        Me.lblMarketplace.Location = New System.Drawing.Point(310, 52)
        Me.lblMarketplace.Name = "lblMarketplace"
        Me.lblMarketplace.Size = New System.Drawing.Size(69, 13)
        Me.lblMarketplace.TabIndex = 9
        Me.lblMarketplace.Text = "Marketplace:"
        '
        'cmbMarketplace
        '
        Me.cmbMarketplace.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.cmbMarketplace.FormattingEnabled = True
        Me.cmbMarketplace.Location = New System.Drawing.Point(310, 68)
        Me.cmbMarketplace.Name = "cmbMarketplace"
        Me.cmbMarketplace.Size = New System.Drawing.Size(150, 21)
        Me.cmbMarketplace.TabIndex = 10
        '
        'lblSupplier
        '
        Me.lblSupplier.AutoSize = True
        Me.lblSupplier.Location = New System.Drawing.Point(475, 52)
        Me.lblSupplier.Name = "lblSupplier"
        Me.lblSupplier.Size = New System.Drawing.Size(53, 13)
        Me.lblSupplier.TabIndex = 11
        Me.lblSupplier.Text = "Fornitore:"
        '
        'cmbSupplier
        '
        Me.cmbSupplier.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.cmbSupplier.FormattingEnabled = True
        Me.cmbSupplier.Location = New System.Drawing.Point(475, 68)
        Me.cmbSupplier.Name = "cmbSupplier"
        Me.cmbSupplier.Size = New System.Drawing.Size(150, 21)
        Me.cmbSupplier.TabIndex = 12
        '
        'lblWarehouse
        '
        Me.lblWarehouse.AutoSize = True
        Me.lblWarehouse.Location = New System.Drawing.Point(640, 52)
        Me.lblWarehouse.Name = "lblWarehouse"
        Me.lblWarehouse.Size = New System.Drawing.Size(63, 13)
        Me.lblWarehouse.TabIndex = 13
        Me.lblWarehouse.Text = "Magazzino:"
        '
        'cmbWarehouse
        '
        Me.cmbWarehouse.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.cmbWarehouse.FormattingEnabled = True
        Me.cmbWarehouse.Location = New System.Drawing.Point(640, 68)
        Me.cmbWarehouse.Name = "cmbWarehouse"
        Me.cmbWarehouse.Size = New System.Drawing.Size(150, 21)
        Me.cmbWarehouse.TabIndex = 14
        '
        'lblCourier
        '
        Me.lblCourier.AutoSize = True
        Me.lblCourier.Location = New System.Drawing.Point(310, 100)
        Me.lblCourier.Name = "lblCourier"
        Me.lblCourier.Size = New System.Drawing.Size(48, 13)
        Me.lblCourier.TabIndex = 15
        Me.lblCourier.Text = "Corriere:"
        '
        'cmbCourier
        '
        Me.cmbCourier.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.cmbCourier.FormattingEnabled = True
        Me.cmbCourier.Location = New System.Drawing.Point(310, 116)
        Me.cmbCourier.Name = "cmbCourier"
        Me.cmbCourier.Size = New System.Drawing.Size(150, 21)
        Me.cmbCourier.TabIndex = 16
        '
        'lblProductCostStatus
        '
        Me.lblProductCostStatus.AutoSize = True
        Me.lblProductCostStatus.Location = New System.Drawing.Point(475, 100)
        Me.lblProductCostStatus.Name = "lblProductCostStatus"
        Me.lblProductCostStatus.Size = New System.Drawing.Size(89, 13)
        Me.lblProductCostStatus.TabIndex = 17
        Me.lblProductCostStatus.Text = "Costo Prodotto:"
        '
        'cmbProductCostStatus
        '
        Me.cmbProductCostStatus.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.cmbProductCostStatus.FormattingEnabled = True
        Me.cmbProductCostStatus.Location = New System.Drawing.Point(475, 116)
        Me.cmbProductCostStatus.Name = "cmbProductCostStatus"
        Me.cmbProductCostStatus.Size = New System.Drawing.Size(150, 21)
        Me.cmbProductCostStatus.TabIndex = 18
        '
        'lblShippingCostStatus
        '
        Me.lblShippingCostStatus.AutoSize = True
        Me.lblShippingCostStatus.Location = New System.Drawing.Point(640, 100)
        Me.lblShippingCostStatus.Name = "lblShippingCostStatus"
        Me.lblShippingCostStatus.Size = New System.Drawing.Size(100, 13)
        Me.lblShippingCostStatus.TabIndex = 19
        Me.lblShippingCostStatus.Text = "Costo Spedizione:"
        '
        'cmbShippingCostStatus
        '
        Me.cmbShippingCostStatus.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.cmbShippingCostStatus.FormattingEnabled = True
        Me.cmbShippingCostStatus.Location = New System.Drawing.Point(640, 116)
        Me.cmbShippingCostStatus.Name = "cmbShippingCostStatus"
        Me.cmbShippingCostStatus.Size = New System.Drawing.Size(150, 21)
        Me.cmbShippingCostStatus.TabIndex = 20
        '
        'btnSearch
        '
        Me.btnSearch.BackColor = System.Drawing.Color.DodgerBlue
        Me.btnSearch.Font = New System.Drawing.Font("Segoe UI", 10.0!, System.Drawing.FontStyle.Bold)
        Me.btnSearch.ForeColor = System.Drawing.Color.White
        Me.btnSearch.Location = New System.Drawing.Point(12, 145)
        Me.btnSearch.Name = "btnSearch"
        Me.btnSearch.Size = New System.Drawing.Size(120, 30)
        Me.btnSearch.TabIndex = 21
        Me.btnSearch.Text = "Cerca"
        Me.btnSearch.UseVisualStyleBackColor = False
        '
        'btnReset
        '
        Me.btnReset.BackColor = System.Drawing.Color.Gray
        Me.btnReset.Font = New System.Drawing.Font("Segoe UI", 10.0!)
        Me.btnReset.ForeColor = System.Drawing.Color.White
        Me.btnReset.Location = New System.Drawing.Point(138, 145)
        Me.btnReset.Name = "btnReset"
        Me.btnReset.Size = New System.Drawing.Size(120, 30)
        Me.btnReset.TabIndex = 22
        Me.btnReset.Text = "Reset"
        Me.btnReset.UseVisualStyleBackColor = False
        '
        'panelStats
        '
        Me.panelStats.BackColor = System.Drawing.Color.Azure
        Me.panelStats.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.panelStats.Controls.Add(Me.lblTotalCosts)
        Me.panelStats.Controls.Add(Me.lblTotalRevenue)
        Me.panelStats.Controls.Add(Me.lblTotalMargin)
        Me.panelStats.Controls.Add(Me.lblLosingOrders)
        Me.panelStats.Controls.Add(Me.lblProfitableOrders)
        Me.panelStats.Controls.Add(Me.lblTotalOrders)
        Me.panelStats.Controls.Add(Me.lblStatsTitle)
        Me.panelStats.Dock = System.Windows.Forms.DockStyle.Right
        Me.panelStats.Location = New System.Drawing.Point(1300, 180)
        Me.panelStats.Name = "panelStats"
        Me.panelStats.Size = New System.Drawing.Size(300, 620)
        Me.panelStats.TabIndex = 1
        '
        'lblStatsTitle
        '
        Me.lblStatsTitle.AutoSize = True
        Me.lblStatsTitle.Font = New System.Drawing.Font("Segoe UI", 14.0!, System.Drawing.FontStyle.Bold)
        Me.lblStatsTitle.Location = New System.Drawing.Point(12, 12)
        Me.lblStatsTitle.Name = "lblStatsTitle"
        Me.lblStatsTitle.Size = New System.Drawing.Size(107, 25)
        Me.lblStatsTitle.TabIndex = 0
        Me.lblStatsTitle.Text = "Statistiche"
        '
        'lblTotalOrders
        '
        Me.lblTotalOrders.AutoSize = True
        Me.lblTotalOrders.Font = New System.Drawing.Font("Segoe UI", 11.0!)
        Me.lblTotalOrders.Location = New System.Drawing.Point(12, 52)
        Me.lblTotalOrders.Name = "lblTotalOrders"
        Me.lblTotalOrders.Size = New System.Drawing.Size(125, 20)
        Me.lblTotalOrders.TabIndex = 1
        Me.lblTotalOrders.Text = "Ordini Totali: 0"
        '
        'lblProfitableOrders
        '
        Me.lblProfitableOrders.AutoSize = True
        Me.lblProfitableOrders.Font = New System.Drawing.Font("Segoe UI", 11.0!)
        Me.lblProfitableOrders.ForeColor = System.Drawing.Color.Green
        Me.lblProfitableOrders.Location = New System.Drawing.Point(12, 82)
        Me.lblProfitableOrders.Name = "lblProfitableOrders"
        Me.lblProfitableOrders.Size = New System.Drawing.Size(157, 20)
        Me.lblProfitableOrders.TabIndex = 2
        Me.lblProfitableOrders.Text = "In Profitto: 0 (0.0%)"
        '
        'lblLosingOrders
        '
        Me.lblLosingOrders.AutoSize = True
        Me.lblLosingOrders.Font = New System.Drawing.Font("Segoe UI", 11.0!)
        Me.lblLosingOrders.ForeColor = System.Drawing.Color.Red
        Me.lblLosingOrders.Location = New System.Drawing.Point(12, 112)
        Me.lblLosingOrders.Name = "lblLosingOrders"
        Me.lblLosingOrders.Size = New System.Drawing.Size(153, 20)
        Me.lblLosingOrders.TabIndex = 3
        Me.lblLosingOrders.Text = "In Perdita: 0 (0.0%)"
        '
        'lblTotalMargin
        '
        Me.lblTotalMargin.AutoSize = True
        Me.lblTotalMargin.Font = New System.Drawing.Font("Segoe UI", 12.0!, System.Drawing.FontStyle.Bold)
        Me.lblTotalMargin.Location = New System.Drawing.Point(12, 152)
        Me.lblTotalMargin.Name = "lblTotalMargin"
        Me.lblTotalMargin.Size = New System.Drawing.Size(186, 21)
        Me.lblTotalMargin.TabIndex = 4
        Me.lblTotalMargin.Text = "Margine Totale: €0.00"
        '
        'lblTotalRevenue
        '
        Me.lblTotalRevenue.AutoSize = True
        Me.lblTotalRevenue.Font = New System.Drawing.Font("Segoe UI", 11.0!)
        Me.lblTotalRevenue.Location = New System.Drawing.Point(12, 192)
        Me.lblTotalRevenue.Name = "lblTotalRevenue"
        Me.lblTotalRevenue.Size = New System.Drawing.Size(128, 20)
        Me.lblTotalRevenue.TabIndex = 5
        Me.lblTotalRevenue.Text = "Incassato: €0.00"
        '
        'lblTotalCosts
        '
        Me.lblTotalCosts.AutoSize = True
        Me.lblTotalCosts.Font = New System.Drawing.Font("Segoe UI", 11.0!)
        Me.lblTotalCosts.Location = New System.Drawing.Point(12, 222)
        Me.lblTotalCosts.Name = "lblTotalCosts"
        Me.lblTotalCosts.Size = New System.Drawing.Size(150, 20)
        Me.lblTotalCosts.TabIndex = 6
        Me.lblTotalCosts.Text = "Costi Totali: €0.00"
        '
        'dgvOrders
        '
        Me.dgvOrders.AllowUserToAddRows = False
        Me.dgvOrders.AllowUserToDeleteRows = False
        Me.dgvOrders.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.AllCells
        Me.dgvOrders.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.dgvOrders.Columns.AddRange(New System.Windows.Forms.DataGridViewColumn() {Me.colExpand, Me.colOrderId, Me.colMarketplace, Me.colCustomerName, Me.colOrderDate, Me.colFulfillmentDate, Me.colSupplier, Me.colWarehouse, Me.colCourier, Me.colProductValue, Me.colShippingValue, Me.colDiscounts, Me.colRevenueTotal, Me.colProductCost, Me.colShippingCost, Me.colCommissions, Me.colCostsTotal, Me.colMarginValue, Me.colMarginPercentage, Me.colProductCostStatus, Me.colShippingCostStatus})
        Me.dgvOrders.Dock = System.Windows.Forms.DockStyle.Fill
        Me.dgvOrders.Location = New System.Drawing.Point(0, 180)
        Me.dgvOrders.Name = "dgvOrders"
        Me.dgvOrders.ReadOnly = True
        Me.dgvOrders.RowHeadersVisible = False
        Me.dgvOrders.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect
        Me.dgvOrders.Size = New System.Drawing.Size(1300, 620)
        Me.dgvOrders.TabIndex = 2
        '
        'colExpand
        '
        Me.colExpand.HeaderText = ""
        Me.colExpand.Name = "colExpand"
        Me.colExpand.ReadOnly = True
        Me.colExpand.Width = 19
        '
        'colOrderId
        '
        Me.colOrderId.HeaderText = "ID Ordine"
        Me.colOrderId.Name = "colOrderId"
        Me.colOrderId.ReadOnly = True
        Me.colOrderId.Width = 78
        '
        'colMarketplace
        '
        Me.colMarketplace.HeaderText = "Marketplace"
        Me.colMarketplace.Name = "colMarketplace"
        Me.colMarketplace.ReadOnly = True
        Me.colMarketplace.Width = 95
        '
        'colCustomerName
        '
        Me.colCustomerName.HeaderText = "Cliente"
        Me.colCustomerName.Name = "colCustomerName"
        Me.colCustomerName.ReadOnly = True
        Me.colCustomerName.Width = 64
        '
        'colOrderDate
        '
        Me.colOrderDate.HeaderText = "Data Ordine"
        Me.colOrderDate.Name = "colOrderDate"
        Me.colOrderDate.ReadOnly = True
        Me.colOrderDate.Width = 90
        '
        'colFulfillmentDate
        '
        Me.colFulfillmentDate.HeaderText = "Data Evasione"
        Me.colFulfillmentDate.Name = "colFulfillmentDate"
        Me.colFulfillmentDate.ReadOnly = True
        Me.colFulfillmentDate.Width = 102
        '
        'colSupplier
        '
        Me.colSupplier.HeaderText = "Fornitore"
        Me.colSupplier.Name = "colSupplier"
        Me.colSupplier.ReadOnly = True
        Me.colSupplier.Width = 74
        '
        'colWarehouse
        '
        Me.colWarehouse.HeaderText = "Magazzino"
        Me.colWarehouse.Name = "colWarehouse"
        Me.colWarehouse.ReadOnly = True
        Me.colWarehouse.Width = 84
        '
        'colCourier
        '
        Me.colCourier.HeaderText = "Corriere"
        Me.colCourier.Name = "colCourier"
        Me.colCourier.ReadOnly = True
        Me.colCourier.Width = 69
        '
        'colProductValue
        '
        Me.colProductValue.HeaderText = "Val. Prodotto"
        Me.colProductValue.Name = "colProductValue"
        Me.colProductValue.ReadOnly = True
        Me.colProductValue.Width = 95
        '
        'colShippingValue
        '
        Me.colShippingValue.HeaderText = "Val. Spedizione"
        Me.colShippingValue.Name = "colShippingValue"
        Me.colShippingValue.ReadOnly = True
        Me.colShippingValue.Width = 106
        '
        'colDiscounts
        '
        Me.colDiscounts.HeaderText = "Sconti"
        Me.colDiscounts.Name = "colDiscounts"
        Me.colDiscounts.ReadOnly = True
        Me.colDiscounts.Width = 63
        '
        'colRevenueTotal
        '
        Me.colRevenueTotal.HeaderText = "Incassato"
        Me.colRevenueTotal.Name = "colRevenueTotal"
        Me.colRevenueTotal.ReadOnly = True
        Me.colRevenueTotal.Width = 78
        '
        'colProductCost
        '
        Me.colProductCost.HeaderText = "Costo Prodotto"
        Me.colProductCost.Name = "colProductCost"
        Me.colProductCost.ReadOnly = True
        Me.colProductCost.Width = 105
        '
        'colShippingCost
        '
        Me.colShippingCost.HeaderText = "Costo Spedizione"
        Me.colShippingCost.Name = "colShippingCost"
        Me.colShippingCost.ReadOnly = True
        Me.colShippingCost.Width = 121
        '
        'colCommissions
        '
        Me.colCommissions.HeaderText = "Commissioni"
        Me.colCommissions.Name = "colCommissions"
        Me.colCommissions.ReadOnly = True
        Me.colCommissions.Width = 96
        '
        'colCostsTotal
        '
        Me.colCostsTotal.HeaderText = "Costi Totali"
        Me.colCostsTotal.Name = "colCostsTotal"
        Me.colCostsTotal.ReadOnly = True
        Me.colCostsTotal.Width = 84
        '
        'colMarginValue
        '
        Me.colMarginValue.HeaderText = "Margine €"
        Me.colMarginValue.Name = "colMarginValue"
        Me.colMarginValue.ReadOnly = True
        Me.colMarginValue.Width = 81
        '
        'colMarginPercentage
        '
        Me.colMarginPercentage.HeaderText = "Margine %"
        Me.colMarginPercentage.Name = "colMarginPercentage"
        Me.colMarginPercentage.ReadOnly = True
        Me.colMarginPercentage.Width = 84
        '
        'colProductCostStatus
        '
        Me.colProductCostStatus.HeaderText = "Costo Prod."
        Me.colProductCostStatus.Name = "colProductCostStatus"
        Me.colProductCostStatus.ReadOnly = True
        Me.colProductCostStatus.Width = 88
        '
        'colShippingCostStatus
        '
        Me.colShippingCostStatus.HeaderText = "Costo Sped."
        Me.colShippingCostStatus.Name = "colShippingCostStatus"
        Me.colShippingCostStatus.ReadOnly = True
        Me.colShippingCostStatus.Width = 89
        '
        'MainForm
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(1600, 800)
        Me.Controls.Add(Me.dgvOrders)
        Me.Controls.Add(Me.panelStats)
        Me.Controls.Add(Me.panelFilters)
        Me.Name = "MainForm"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "Analisi Margine Preliminare Ordini - VB.NET + .NET Framework 4.8"
        Me.WindowState = System.Windows.Forms.FormWindowState.Maximized
        Me.panelFilters.ResumeLayout(False)
        Me.panelFilters.PerformLayout()
        Me.panelStats.ResumeLayout(False)
        Me.panelStats.PerformLayout()
        CType(Me.dgvOrders, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
    End Sub

    Friend WithEvents panelFilters As Panel
    Friend WithEvents lblTitle As Label
    Friend WithEvents lblSearch As Label
    Friend WithEvents txtSearch As TextBox
    Friend WithEvents lblDateFrom As Label
    Friend WithEvents chkDateFrom As CheckBox
    Friend WithEvents dtpDateFrom As DateTimePicker
    Friend WithEvents lblDateTo As Label
    Friend WithEvents chkDateTo As CheckBox
    Friend WithEvents dtpDateTo As DateTimePicker
    Friend WithEvents lblMarketplace As Label
    Friend WithEvents cmbMarketplace As ComboBox
    Friend WithEvents lblSupplier As Label
    Friend WithEvents cmbSupplier As ComboBox
    Friend WithEvents lblWarehouse As Label
    Friend WithEvents cmbWarehouse As ComboBox
    Friend WithEvents lblCourier As Label
    Friend WithEvents cmbCourier As ComboBox
    Friend WithEvents lblProductCostStatus As Label
    Friend WithEvents cmbProductCostStatus As ComboBox
    Friend WithEvents lblShippingCostStatus As Label
    Friend WithEvents cmbShippingCostStatus As ComboBox
    Friend WithEvents btnSearch As Button
    Friend WithEvents btnReset As Button
    Friend WithEvents panelStats As Panel
    Friend WithEvents lblStatsTitle As Label
    Friend WithEvents lblTotalOrders As Label
    Friend WithEvents lblProfitableOrders As Label
    Friend WithEvents lblLosingOrders As Label
    Friend WithEvents lblTotalMargin As Label
    Friend WithEvents lblTotalRevenue As Label
    Friend WithEvents lblTotalCosts As Label
    Friend WithEvents dgvOrders As DataGridView
    Friend WithEvents colExpand As DataGridViewTextBoxColumn
    Friend WithEvents colOrderId As DataGridViewTextBoxColumn
    Friend WithEvents colMarketplace As DataGridViewTextBoxColumn
    Friend WithEvents colCustomerName As DataGridViewTextBoxColumn
    Friend WithEvents colOrderDate As DataGridViewTextBoxColumn
    Friend WithEvents colFulfillmentDate As DataGridViewTextBoxColumn
    Friend WithEvents colSupplier As DataGridViewTextBoxColumn
    Friend WithEvents colWarehouse As DataGridViewTextBoxColumn
    Friend WithEvents colCourier As DataGridViewTextBoxColumn
    Friend WithEvents colProductValue As DataGridViewTextBoxColumn
    Friend WithEvents colShippingValue As DataGridViewTextBoxColumn
    Friend WithEvents colDiscounts As DataGridViewTextBoxColumn
    Friend WithEvents colRevenueTotal As DataGridViewTextBoxColumn
    Friend WithEvents colProductCost As DataGridViewTextBoxColumn
    Friend WithEvents colShippingCost As DataGridViewTextBoxColumn
    Friend WithEvents colCommissions As DataGridViewTextBoxColumn
    Friend WithEvents colCostsTotal As DataGridViewTextBoxColumn
    Friend WithEvents colMarginValue As DataGridViewTextBoxColumn
    Friend WithEvents colMarginPercentage As DataGridViewTextBoxColumn
    Friend WithEvents colProductCostStatus As DataGridViewTextBoxColumn
    Friend WithEvents colShippingCostStatus As DataGridViewTextBoxColumn
End Class

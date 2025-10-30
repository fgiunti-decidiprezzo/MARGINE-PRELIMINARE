Imports System.Runtime.Serialization

Namespace Models
    ''' <summary>
    ''' Rappresenta i valori dei ricavi
    ''' </summary>
    <DataContract>
    Public Class Revenue
        <DataMember>
        Public Property ProductValue As Decimal

        <DataMember>
        Public Property ShippingValue As Decimal

        <DataMember>
        Public Property Discounts As Decimal

        <DataMember>
        Public Property Total As Decimal
    End Class

    ''' <summary>
    ''' Rappresenta i costi sostenuti
    ''' </summary>
    <DataContract>
    Public Class Costs
        <DataMember>
        Public Property ProductCost As Decimal

        <DataMember>
        Public Property ShippingCost As Decimal

        <DataMember>
        Public Property Commissions As Decimal

        <DataMember>
        Public Property Total As Decimal
    End Class

    ''' <summary>
    ''' Rappresenta il margine operativo
    ''' </summary>
    <DataContract>
    Public Class Margin
        <DataMember>
        Public Property Value As Decimal

        <DataMember>
        Public Property Percentage As Decimal
    End Class

    ''' <summary>
    ''' Rappresenta una singola spedizione
    ''' </summary>
    <DataContract>
    Public Class Shipment
        <DataMember>
        Public Property Id As String

        <DataMember>
        Public Property OrderId As String

        <DataMember>
        Public Property TrackingNumber As String

        <DataMember>
        Public Property Marketplace As String

        <DataMember>
        Public Property CustomerName As String

        <DataMember>
        Public Property Quantity As Integer

        <DataMember>
        Public Property Revenue As Revenue

        <DataMember>
        Public Property Costs As Costs

        <DataMember>
        Public Property Margin As Margin

        <DataMember>
        Public Property HasValidProductCost As Boolean

        <DataMember>
        Public Property HasValidShippingCost As Boolean
    End Class

    ''' <summary>
    ''' Rappresenta un ordine completo
    ''' </summary>
    <DataContract>
    Public Class Order
        <DataMember>
        Public Property Id As String

        <DataMember>
        Public Property Marketplace As String

        <DataMember>
        Public Property CustomerName As String

        <DataMember>
        Public Property OrderDate As DateTime

        <DataMember>
        Public Property FulfillmentDate As DateTime?

        <DataMember>
        Public Property Supplier As String

        <DataMember>
        Public Property Warehouse As String

        <DataMember>
        Public Property Courier As String

        <DataMember>
        Public Property Revenue As Revenue

        <DataMember>
        Public Property Costs As Costs

        <DataMember>
        Public Property Margin As Margin

        <DataMember>
        Public Property Shipments As List(Of Shipment)

        <DataMember>
        Public Property HasValidProductCosts As Boolean

        <DataMember>
        Public Property HasValidShippingCosts As Boolean

        Public Sub New()
            Shipments = New List(Of Shipment)()
        End Sub
    End Class

    ''' <summary>
    ''' Statistiche aggregate
    ''' </summary>
    <DataContract>
    Public Class OrderStatistics
        <DataMember>
        Public Property TotalOrders As Integer

        <DataMember>
        Public Property ProfitableOrders As Integer

        <DataMember>
        Public Property ProfitablePercentage As Decimal

        <DataMember>
        Public Property LosingOrders As Integer

        <DataMember>
        Public Property LosingPercentage As Decimal

        <DataMember>
        Public Property TotalMargin As Decimal

        <DataMember>
        Public Property TotalRevenue As Decimal

        <DataMember>
        Public Property TotalCosts As Decimal

        <DataMember>
        Public Property AverageMarginPercentage As Decimal
    End Class

    ''' <summary>
    ''' Opzioni per i filtri
    ''' </summary>
    <DataContract>
    Public Class FilterOptions
        <DataMember>
        Public Property Suppliers As List(Of String)

        <DataMember>
        Public Property Warehouses As List(Of String)

        <DataMember>
        Public Property Couriers As List(Of String)

        <DataMember>
        Public Property Marketplaces As List(Of String)

        Public Sub New()
            Suppliers = New List(Of String)()
            Warehouses = New List(Of String)()
            Couriers = New List(Of String)()
            Marketplaces = New List(Of String)()
        End Sub
    End Class

    ''' <summary>
    ''' Parametri di filtro per la ricerca
    ''' </summary>
    Public Class OrderFilters
        Public Property SearchQuery As String
        Public Property DateFrom As DateTime?
        Public Property DateTo As DateTime?
        Public Property Supplier As String
        Public Property FulfillmentDate As DateTime?
        Public Property Warehouse As String
        Public Property Courier As String
        Public Property Marketplace As String
        Public Property ProductCostStatus As String ' "ok" o "ko"
        Public Property ShippingCostStatus As String ' "ok" o "ko"
    End Class
End Namespace

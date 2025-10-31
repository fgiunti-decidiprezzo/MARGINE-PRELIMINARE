Imports System.Runtime.Serialization

Namespace Models
    ''' <summary>
    ''' Rappresenta i valori dei ricavi
    ''' </summary>
    Public Class Revenue
        Public Property ProductValue As Decimal
        Public Property ShippingValue As Decimal
        Public Property Discounts As Decimal
        Public Property Total As Decimal
    End Class

    ''' <summary>
    ''' Rappresenta i costi sostenuti
    ''' </summary>
    Public Class Costs
        Public Property ProductCost As Decimal
        Public Property ShippingCost As Decimal
        Public Property Commissions As Decimal
        Public Property Total As Decimal
    End Class

    ''' <summary>
    ''' Rappresenta il margine operativo
    ''' </summary>
    Public Class Margin
        Public Property Value As Decimal
        Public Property Percentage As Decimal
    End Class

    ''' <summary>
    ''' Rappresenta una singola spedizione
    ''' </summary>
    Public Class Shipment
        Public Property Id As String
        Public Property OrderId As String
        Public Property TrackingNumber As String
        Public Property Marketplace As String
        Public Property CustomerName As String
        Public Property Quantity As Integer
        Public Property Revenue As Revenue
        Public Property Costs As Costs
        Public Property Margin As Margin
        Public Property HasValidProductCost As Boolean
        Public Property HasValidShippingCost As Boolean
    End Class

    ''' <summary>
    ''' Rappresenta un ordine completo
    ''' </summary>
    Public Class Order
        Public Property Id As String
        Public Property Marketplace As String
        Public Property CustomerName As String
        Public Property OrderDate As DateTime
        Public Property FulfillmentDate As DateTime?
        Public Property Supplier As String
        Public Property Warehouse As String
        Public Property Courier As String
        Public Property Revenue As Revenue
        Public Property Costs As Costs
        Public Property Margin As Margin
        Public Property Shipments As List(Of Shipment)
        Public Property HasValidProductCosts As Boolean
        Public Property HasValidShippingCosts As Boolean
        Public Property IsExpanded As Boolean ' Per UI

        Public Sub New()
            Shipments = New List(Of Shipment)()
            IsExpanded = False
        End Sub
    End Class

    ''' <summary>
    ''' Statistiche aggregate
    ''' </summary>
    Public Class OrderStatistics
        Public Property TotalOrders As Integer
        Public Property ProfitableOrders As Integer
        Public Property ProfitablePercentage As Decimal
        Public Property LosingOrders As Integer
        Public Property LosingPercentage As Decimal
        Public Property TotalMargin As Decimal
        Public Property TotalRevenue As Decimal
        Public Property TotalCosts As Decimal
        Public Property AverageMarginPercentage As Decimal
    End Class

    ''' <summary>
    ''' Parametri di filtro
    ''' </summary>
    Public Class OrderFilters
        Public Property SearchQuery As String
        Public Property DateFrom As DateTime?
        Public Property DateTo As DateTime?
        Public Property Supplier As String
        Public Property Warehouse As String
        Public Property Courier As String
        Public Property Marketplace As String
        Public Property ProductCostStatus As String
        Public Property ShippingCostStatus As String
    End Class
End Namespace

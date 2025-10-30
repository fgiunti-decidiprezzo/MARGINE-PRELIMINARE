Imports System.Web.Mvc
Imports OrderMarginAnalysis.Models
Imports OrderMarginAnalysis.Services

Namespace Controllers
    ''' <summary>
    ''' Controller per la gestione degli ordini
    ''' </summary>
    Public Class OrdersController
        Inherits Controller

        Private ReadOnly _mockDataService As MockDataService

        Public Sub New()
            _mockDataService = New MockDataService()
        End Sub

        ' GET: Orders
        Public Function Index() As ActionResult
            Return View()
        End Function

        ' GET: api/orders - Restituisce ordini con filtri applicati
        Public Function GetOrders(searchQuery As String,
                                  dateFrom As String,
                                  dateTo As String,
                                  supplier As String,
                                  warehouse As String,
                                  courier As String,
                                  marketplace As String,
                                  productCostStatus As String,
                                  shippingCostStatus As String) As JsonResult

            Dim filters As New OrderFilters() With {
                .SearchQuery = searchQuery,
                .Supplier = supplier,
                .Warehouse = warehouse,
                .Courier = courier,
                .Marketplace = marketplace,
                .ProductCostStatus = productCostStatus,
                .ShippingCostStatus = shippingCostStatus
            }

            ' Parse date filters
            Dim parsedDateFrom As DateTime
            If Not String.IsNullOrWhiteSpace(dateFrom) AndAlso DateTime.TryParse(dateFrom, parsedDateFrom) Then
                filters.DateFrom = parsedDateFrom
            End If

            Dim parsedDateTo As DateTime
            If Not String.IsNullOrWhiteSpace(dateTo) AndAlso DateTime.TryParse(dateTo, parsedDateTo) Then
                filters.DateTo = parsedDateTo
            End If

            ' Ottieni ordini filtrati
            Dim orders = _mockDataService.GetOrders(filters)
            Dim statistics = _mockDataService.GetStatistics(filters)

            Dim result = New With {
                .orders = orders,
                .statistics = statistics
            }

            Return Json(result, JsonRequestBehavior.AllowGet)
        End Function

        ' GET: api/filter-options - Restituisce le opzioni per i filtri
        Public Function GetFilterOptions() As JsonResult
            Dim options = _mockDataService.GetFilterOptions()
            Return Json(options, JsonRequestBehavior.AllowGet)
        End Function

    End Class
End Namespace

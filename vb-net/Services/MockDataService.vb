Imports OrderMarginAnalysis.Models

Namespace Services
    ''' <summary>
    ''' Servizio per fornire dati mock per demo/sviluppo
    ''' </summary>
    Public Class MockDataService
        Private ReadOnly _mockOrders As List(Of Order)

        Public Sub New()
            _mockOrders = New List(Of Order)()
            InitializeMockData()
        End Sub

        ''' <summary>
        ''' Inizializza i dati mock
        ''' </summary>
        Private Sub InitializeMockData()
            ' Ordine 1: Amazon - 2 spedizioni - IN PROFITTO
            Dim order1 As New Order() With {
                .Id = "ORD-001",
                .Marketplace = "Amazon",
                .CustomerName = "Mario Rossi",
                .OrderDate = New DateTime(2025, 1, 15, 10, 30, 0),
                .FulfillmentDate = New DateTime(2025, 1, 16, 14, 20, 0),
                .Supplier = "Fornitore A",
                .Warehouse = "Magazzino A",
                .Courier = "DHL",
                .Revenue = New Revenue() With {
                    .ProductValue = 250D,
                    .ShippingValue = 15D,
                    .Discounts = 0D,
                    .Total = 265D
                },
                .Costs = New Costs() With {
                    .ProductCost = 180D,
                    .ShippingCost = 12D,
                    .Commissions = 26.5D,
                    .Total = 218.5D
                },
                .Margin = New Margin() With {
                    .Value = 46.5D,
                    .Percentage = 17.55D
                },
                .HasValidProductCosts = True,
                .HasValidShippingCosts = True
            }

            order1.Shipments.Add(New Shipment() With {
                .Id = "ORD-001-1",
                .OrderId = "ORD-001",
                .TrackingNumber = "TRK001234567",
                .Marketplace = "Amazon",
                .CustomerName = "Mario Rossi",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 120D, .ShippingValue = 8D, .Discounts = 0D, .Total = 128D},
                .Costs = New Costs() With {.ProductCost = 85D, .ShippingCost = 6D, .Commissions = 12.8D, .Total = 103.8D},
                .Margin = New Margin() With {.Value = 24.2D, .Percentage = 18.91D},
                .HasValidProductCost = True,
                .HasValidShippingCost = True
            })

            order1.Shipments.Add(New Shipment() With {
                .Id = "ORD-001-2",
                .OrderId = "ORD-001",
                .TrackingNumber = "TRK001234568",
                .Marketplace = "Amazon",
                .CustomerName = "Mario Rossi",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 130D, .ShippingValue = 7D, .Discounts = 0D, .Total = 137D},
                .Costs = New Costs() With {.ProductCost = 95D, .ShippingCost = 6D, .Commissions = 13.7D, .Total = 114.7D},
                .Margin = New Margin() With {.Value = 22.3D, .Percentage = 16.28D},
                .HasValidProductCost = True,
                .HasValidShippingCost = True
            })

            _mockOrders.Add(order1)

            ' Ordine 2: eBay - 1 spedizione - IN PERDITA
            Dim order2 As New Order() With {
                .Id = "ORD-002",
                .Marketplace = "eBay",
                .CustomerName = "Giulia Bianchi",
                .OrderDate = New DateTime(2025, 1, 16, 9, 15, 0),
                .FulfillmentDate = New DateTime(2025, 1, 17, 11, 30, 0),
                .Supplier = "Fornitore B",
                .Warehouse = "Magazzino B",
                .Courier = "UPS",
                .Revenue = New Revenue() With {.ProductValue = 89.9D, .ShippingValue = 9.9D, .Discounts = 5D, .Total = 94.8D},
                .Costs = New Costs() With {.ProductCost = 95D, .ShippingCost = 12D, .Commissions = 9.48D, .Total = 116.48D},
                .Margin = New Margin() With {.Value = -21.68D, .Percentage = -22.87D},
                .HasValidProductCosts = False,
                .HasValidShippingCosts = False
            }

            order2.Shipments.Add(New Shipment() With {
                .Id = "ORD-002-1",
                .OrderId = "ORD-002",
                .TrackingNumber = "TRK002345678",
                .Marketplace = "eBay",
                .CustomerName = "Giulia Bianchi",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 89.9D, .ShippingValue = 9.9D, .Discounts = 5D, .Total = 94.8D},
                .Costs = New Costs() With {.ProductCost = 95D, .ShippingCost = 12D, .Commissions = 9.48D, .Total = 116.48D},
                .Margin = New Margin() With {.Value = -21.68D, .Percentage = -22.87D},
                .HasValidProductCost = False,
                .HasValidShippingCost = False
            })

            _mockOrders.Add(order2)

            ' Ordine 3: Sito Web - MARGINE ZERO
            Dim order3 As New Order() With {
                .Id = "ORD-003",
                .Marketplace = "Sito Web",
                .CustomerName = "Luca Verdi",
                .OrderDate = New DateTime(2025, 1, 17, 14, 45, 0),
                .FulfillmentDate = Nothing,
                .Supplier = "Fornitore C",
                .Warehouse = "Magazzino A",
                .Courier = "GLS",
                .Revenue = New Revenue() With {.ProductValue = 150D, .ShippingValue = 12D, .Discounts = 0D, .Total = 162D},
                .Costs = New Costs() With {.ProductCost = 150D, .ShippingCost = 12D, .Commissions = 0D, .Total = 162D},
                .Margin = New Margin() With {.Value = 0D, .Percentage = 0D},
                .HasValidProductCosts = True,
                .HasValidShippingCosts = True
            }

            order3.Shipments.Add(New Shipment() With {
                .Id = "ORD-003-1",
                .OrderId = "ORD-003",
                .TrackingNumber = "TRK003456789",
                .Marketplace = "Sito Web",
                .CustomerName = "Luca Verdi",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 150D, .ShippingValue = 12D, .Discounts = 0D, .Total = 162D},
                .Costs = New Costs() With {.ProductCost = 150D, .ShippingCost = 12D, .Commissions = 0D, .Total = 162D},
                .Margin = New Margin() With {.Value = 0D, .Percentage = 0D},
                .HasValidProductCost = True,
                .HasValidShippingCost = True
            })

            _mockOrders.Add(order3)

            ' Ordine 4: Amazon - 3 spedizioni - IN PROFITTO
            Dim order4 As New Order() With {
                .Id = "ORD-004",
                .Marketplace = "Amazon",
                .CustomerName = "Anna Neri",
                .OrderDate = New DateTime(2025, 1, 18, 11, 20, 0),
                .FulfillmentDate = New DateTime(2025, 1, 19, 15, 10, 0),
                .Supplier = "Fornitore A",
                .Warehouse = "Magazzino B",
                .Courier = "BRT",
                .Revenue = New Revenue() With {.ProductValue = 450D, .ShippingValue = 25D, .Discounts = 15D, .Total = 460D},
                .Costs = New Costs() With {.ProductCost = 320D, .ShippingCost = 22D, .Commissions = 46D, .Total = 388D},
                .Margin = New Margin() With {.Value = 72D, .Percentage = 15.65D},
                .HasValidProductCosts = True,
                .HasValidShippingCosts = True
            }

            order4.Shipments.Add(New Shipment() With {
                .Id = "ORD-004-1",
                .OrderId = "ORD-004",
                .TrackingNumber = "TRK004567890",
                .Marketplace = "Amazon",
                .CustomerName = "Anna Neri",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 150D, .ShippingValue = 8D, .Discounts = 5D, .Total = 153D},
                .Costs = New Costs() With {.ProductCost = 110D, .ShippingCost = 7D, .Commissions = 15.3D, .Total = 132.3D},
                .Margin = New Margin() With {.Value = 20.7D, .Percentage = 13.53D},
                .HasValidProductCost = True,
                .HasValidShippingCost = True
            })

            order4.Shipments.Add(New Shipment() With {
                .Id = "ORD-004-2",
                .OrderId = "ORD-004",
                .TrackingNumber = "TRK004567891",
                .Marketplace = "Amazon",
                .CustomerName = "Anna Neri",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 180D, .ShippingValue = 9D, .Discounts = 5D, .Total = 184D},
                .Costs = New Costs() With {.ProductCost = 125D, .ShippingCost = 8D, .Commissions = 18.4D, .Total = 151.4D},
                .Margin = New Margin() With {.Value = 32.6D, .Percentage = 17.72D},
                .HasValidProductCost = True,
                .HasValidShippingCost = True
            })

            order4.Shipments.Add(New Shipment() With {
                .Id = "ORD-004-3",
                .OrderId = "ORD-004",
                .TrackingNumber = "TRK004567892",
                .Marketplace = "Amazon",
                .CustomerName = "Anna Neri",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 120D, .ShippingValue = 8D, .Discounts = 5D, .Total = 123D},
                .Costs = New Costs() With {.ProductCost = 85D, .ShippingCost = 7D, .Commissions = 12.3D, .Total = 104.3D},
                .Margin = New Margin() With {.Value = 18.7D, .Percentage = 15.2D},
                .HasValidProductCost = True,
                .HasValidShippingCost = True
            })

            _mockOrders.Add(order4)

            ' Ordine 5: eBay - 2 spedizioni - IN PERDITA
            Dim order5 As New Order() With {
                .Id = "ORD-005",
                .Marketplace = "eBay",
                .CustomerName = "Paolo Gialli",
                .OrderDate = New DateTime(2025, 1, 19, 16, 30, 0),
                .FulfillmentDate = New DateTime(2025, 1, 20, 10, 0, 0),
                .Supplier = "Fornitore B",
                .Warehouse = "Magazzino A",
                .Courier = "SDA",
                .Revenue = New Revenue() With {.ProductValue = 199.9D, .ShippingValue = 14.9D, .Discounts = 20D, .Total = 194.8D},
                .Costs = New Costs() With {.ProductCost = 185D, .ShippingCost = 18D, .Commissions = 19.48D, .Total = 222.48D},
                .Margin = New Margin() With {.Value = -27.68D, .Percentage = -14.21D},
                .HasValidProductCosts = True,
                .HasValidShippingCosts = False
            }

            order5.Shipments.Add(New Shipment() With {
                .Id = "ORD-005-1",
                .OrderId = "ORD-005",
                .TrackingNumber = "TRK005678901",
                .Marketplace = "eBay",
                .CustomerName = "Paolo Gialli",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 99.95D, .ShippingValue = 7.45D, .Discounts = 10D, .Total = 97.4D},
                .Costs = New Costs() With {.ProductCost = 95D, .ShippingCost = 9D, .Commissions = 9.74D, .Total = 113.74D},
                .Margin = New Margin() With {.Value = -16.34D, .Percentage = -16.78D},
                .HasValidProductCost = True,
                .HasValidShippingCost = False
            })

            order5.Shipments.Add(New Shipment() With {
                .Id = "ORD-005-2",
                .OrderId = "ORD-005",
                .TrackingNumber = "TRK005678902",
                .Marketplace = "eBay",
                .CustomerName = "Paolo Gialli",
                .Quantity = 1,
                .Revenue = New Revenue() With {.ProductValue = 99.95D, .ShippingValue = 7.45D, .Discounts = 10D, .Total = 97.4D},
                .Costs = New Costs() With {.ProductCost = 90D, .ShippingCost = 9D, .Commissions = 9.74D, .Total = 108.74D},
                .Margin = New Margin() With {.Value = -11.34D, .Percentage = -11.64D},
                .HasValidProductCost = True,
                .HasValidShippingCost = False
            })

            _mockOrders.Add(order5)
        End Sub

        ''' <summary>
        ''' Ottiene tutti gli ordini con filtri applicati
        ''' </summary>
        Public Function GetOrders(Optional filters As OrderFilters = Nothing) As List(Of Order)
            Dim result = _mockOrders.AsEnumerable()

            If filters IsNot Nothing Then
                ' Ricerca testuale
                If Not String.IsNullOrWhiteSpace(filters.SearchQuery) Then
                    Dim query = filters.SearchQuery.ToLower()
                    result = result.Where(Function(o) o.Id.ToLower().Contains(query) OrElse
                                                      o.CustomerName.ToLower().Contains(query) OrElse
                                                      o.Shipments.Any(Function(s) s.TrackingNumber IsNot Nothing AndAlso s.TrackingNumber.ToLower().Contains(query)))
                End If

                ' Filtro marketplace
                If Not String.IsNullOrWhiteSpace(filters.Marketplace) Then
                    result = result.Where(Function(o) o.Marketplace = filters.Marketplace)
                End If

                ' Filtro fornitore
                If Not String.IsNullOrWhiteSpace(filters.Supplier) Then
                    result = result.Where(Function(o) o.Supplier = filters.Supplier)
                End If

                ' Filtro magazzino
                If Not String.IsNullOrWhiteSpace(filters.Warehouse) Then
                    result = result.Where(Function(o) o.Warehouse = filters.Warehouse)
                End If

                ' Filtro corriere
                If Not String.IsNullOrWhiteSpace(filters.Courier) Then
                    result = result.Where(Function(o) o.Courier = filters.Courier)
                End If

                ' Filtro date
                If filters.DateFrom.HasValue Then
                    result = result.Where(Function(o) o.OrderDate >= filters.DateFrom.Value)
                End If

                If filters.DateTo.HasValue Then
                    result = result.Where(Function(o) o.OrderDate <= filters.DateTo.Value)
                End If

                ' Filtro costi prodotto
                If filters.ProductCostStatus = "ok" Then
                    result = result.Where(Function(o) o.HasValidProductCosts)
                ElseIf filters.ProductCostStatus = "ko" Then
                    result = result.Where(Function(o) Not o.HasValidProductCosts)
                End If

                ' Filtro costi spedizione
                If filters.ShippingCostStatus = "ok" Then
                    result = result.Where(Function(o) o.HasValidShippingCosts)
                ElseIf filters.ShippingCostStatus = "ko" Then
                    result = result.Where(Function(o) Not o.HasValidShippingCosts)
                End If
            End If

            Return result.ToList()
        End Function

        ''' <summary>
        ''' Calcola le statistiche aggregate
        ''' </summary>
        Public Function GetStatistics(Optional filters As OrderFilters = Nothing) As OrderStatistics
            Dim orders = GetOrders(filters)

            Dim stats As New OrderStatistics()
            stats.TotalOrders = orders.Count
            stats.ProfitableOrders = orders.Where(Function(o) o.Margin.Value > 0).Count()
            stats.LosingOrders = orders.Where(Function(o) o.Margin.Value < 0).Count()
            stats.TotalMargin = orders.Sum(Function(o) o.Margin.Value)
            stats.TotalRevenue = orders.Sum(Function(o) o.Revenue.Total)
            stats.TotalCosts = orders.Sum(Function(o) o.Costs.Total)

            If stats.TotalOrders > 0 Then
                stats.ProfitablePercentage = (stats.ProfitableOrders / stats.TotalOrders) * 100
                stats.LosingPercentage = (stats.LosingOrders / stats.TotalOrders) * 100
                stats.AverageMarginPercentage = orders.Average(Function(o) o.Margin.Percentage)
            End If

            Return stats
        End Function

        ''' <summary>
        ''' Ottiene le opzioni per i filtri
        ''' </summary>
        Public Function GetFilterOptions() As FilterOptions
            Dim options As New FilterOptions()

            options.Suppliers = _mockOrders.Select(Function(o) o.Supplier).Distinct().Where(Function(s) Not String.IsNullOrEmpty(s)).ToList()
            options.Warehouses = _mockOrders.Select(Function(o) o.Warehouse).Distinct().Where(Function(w) Not String.IsNullOrEmpty(w)).ToList()
            options.Couriers = _mockOrders.Select(Function(o) o.Courier).Distinct().Where(Function(c) Not String.IsNullOrEmpty(c)).ToList()
            options.Marketplaces = _mockOrders.Select(Function(o) o.Marketplace).Distinct().ToList()

            Return options
        End Function
    End Class
End Namespace

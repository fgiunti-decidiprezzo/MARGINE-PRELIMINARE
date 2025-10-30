using OrderMarginAnalysis.Models;

namespace OrderMarginAnalysis.Services;

public class MockDataService
{
    private readonly List<Order> _mockOrders = new();

    public MockDataService()
    {
        InitializeMockData();
    }

    private void InitializeMockData()
    {
        // ORD-001: Amazon - Profitto
        _mockOrders.Add(new Order
        {
            Id = "ORD-001",
            Marketplace = "Amazon",
            CustomerName = "Mario Rossi",
            OrderDate = new DateTime(2024, 1, 15),
            FulfillmentDate = new DateTime(2024, 1, 16),
            Supplier = "Fornitore A",
            Warehouse = "Milano",
            Courier = "DHL",
            Revenue = new Revenue
            {
                ProductValue = 250.00m,
                ShippingValue = 15.00m,
                Discounts = 0.00m,
                Total = 265.00m
            },
            Costs = new Costs
            {
                ProductCost = 180.00m,
                ShippingCost = 12.00m,
                Commissions = 26.50m,
                Total = 218.50m
            },
            Margin = new Margin
            {
                Value = 46.50m,
                Percentage = 17.55m
            },
            HasValidProductCost = true,
            HasValidShippingCost = true,
            Shipments = new List<Shipment>()
        });

        // ORD-002: eBay - Perdita
        _mockOrders.Add(new Order
        {
            Id = "ORD-002",
            Marketplace = "eBay",
            CustomerName = "Laura Bianchi",
            OrderDate = new DateTime(2024, 1, 18),
            FulfillmentDate = new DateTime(2024, 1, 19),
            Supplier = "Fornitore B",
            Warehouse = "Roma",
            Courier = "UPS",
            Revenue = new Revenue
            {
                ProductValue = 180.00m,
                ShippingValue = 12.00m,
                Discounts = 15.00m,
                Total = 177.00m
            },
            Costs = new Costs
            {
                ProductCost = 150.00m,
                ShippingCost = 30.50m,
                Commissions = 18.18m,
                Total = 198.68m
            },
            Margin = new Margin
            {
                Value = -21.68m,
                Percentage = -12.25m
            },
            HasValidProductCost = false,
            HasValidShippingCost = true,
            Shipments = new List<Shipment>()
        });

        // ORD-003: Sito Web - Pareggio
        _mockOrders.Add(new Order
        {
            Id = "ORD-003",
            Marketplace = "Sito Web",
            CustomerName = "Giuseppe Verdi",
            OrderDate = new DateTime(2024, 1, 20),
            FulfillmentDate = new DateTime(2024, 1, 21),
            Supplier = "Fornitore C",
            Warehouse = "Torino",
            Courier = "FedEx",
            Revenue = new Revenue
            {
                ProductValue = 500.00m,
                ShippingValue = 0.00m,
                Discounts = 50.00m,
                Total = 450.00m
            },
            Costs = new Costs
            {
                ProductCost = 400.00m,
                ShippingCost = 5.00m,
                Commissions = 45.00m,
                Total = 450.00m
            },
            Margin = new Margin
            {
                Value = 0.00m,
                Percentage = 0.00m
            },
            HasValidProductCost = true,
            HasValidShippingCost = true,
            Shipments = new List<Shipment>()
        });

        // ORD-004: Amazon - Profitto
        _mockOrders.Add(new Order
        {
            Id = "ORD-004",
            Marketplace = "Amazon",
            CustomerName = "Anna Ferrari",
            OrderDate = new DateTime(2024, 1, 22),
            FulfillmentDate = new DateTime(2024, 1, 23),
            Supplier = "Fornitore A",
            Warehouse = "Milano",
            Courier = "BRT",
            Revenue = new Revenue
            {
                ProductValue = 320.00m,
                ShippingValue = 18.00m,
                Discounts = 0.00m,
                Total = 338.00m
            },
            Costs = new Costs
            {
                ProductCost = 220.00m,
                ShippingCost = 12.00m,
                Commissions = 34.00m,
                Total = 266.00m
            },
            Margin = new Margin
            {
                Value = 72.00m,
                Percentage = 21.30m
            },
            HasValidProductCost = true,
            HasValidShippingCost = true,
            Shipments = new List<Shipment>()
        });

        // ORD-005: eBay - Perdita
        _mockOrders.Add(new Order
        {
            Id = "ORD-005",
            Marketplace = "eBay",
            CustomerName = "Marco Gialli",
            OrderDate = new DateTime(2024, 1, 25),
            FulfillmentDate = new DateTime(2024, 1, 26),
            Supplier = "Fornitore B",
            Warehouse = "Roma",
            Courier = "DHL",
            Revenue = new Revenue
            {
                ProductValue = 150.00m,
                ShippingValue = 10.00m,
                Discounts = 5.00m,
                Total = 155.00m
            },
            Costs = new Costs
            {
                ProductCost = 130.00m,
                ShippingCost = 35.00m,
                Commissions = 17.68m,
                Total = 182.68m
            },
            Margin = new Margin
            {
                Value = -27.68m,
                Percentage = -17.86m
            },
            HasValidProductCost = true,
            HasValidShippingCost = false,
            Shipments = new List<Shipment>()
        });
    }

    public List<Order> GetOrders(OrderFilters? filters = null)
    {
        var query = _mockOrders.AsQueryable();

        if (filters == null)
            return query.ToList();

        // Search filter
        if (!string.IsNullOrWhiteSpace(filters.SearchQuery))
        {
            var search = filters.SearchQuery.ToLower();
            query = query.Where(o =>
                o.Id.ToLower().Contains(search) ||
                o.CustomerName.ToLower().Contains(search) ||
                o.Shipments.Any(s => s.TrackingNumber.ToLower().Contains(search))
            );
        }

        // Date filters
        if (filters.DateFrom.HasValue)
            query = query.Where(o => o.OrderDate >= filters.DateFrom.Value);

        if (filters.DateTo.HasValue)
            query = query.Where(o => o.OrderDate <= filters.DateTo.Value);

        // Marketplace filter
        if (!string.IsNullOrWhiteSpace(filters.Marketplace))
            query = query.Where(o => o.Marketplace == filters.Marketplace);

        // Supplier filter
        if (!string.IsNullOrWhiteSpace(filters.Supplier))
            query = query.Where(o => o.Supplier == filters.Supplier);

        // Warehouse filter
        if (!string.IsNullOrWhiteSpace(filters.Warehouse))
            query = query.Where(o => o.Warehouse == filters.Warehouse);

        // Courier filter
        if (!string.IsNullOrWhiteSpace(filters.Courier))
            query = query.Where(o => o.Courier == filters.Courier);

        // Product cost status filter
        if (!string.IsNullOrWhiteSpace(filters.ProductCostStatus))
        {
            bool isValid = filters.ProductCostStatus.ToUpper() == "OK";
            query = query.Where(o => o.HasValidProductCost == isValid);
        }

        // Shipping cost status filter
        if (!string.IsNullOrWhiteSpace(filters.ShippingCostStatus))
        {
            bool isValid = filters.ShippingCostStatus.ToUpper() == "OK";
            query = query.Where(o => o.HasValidShippingCost == isValid);
        }

        return query.ToList();
    }

    public OrderStatistics GetStatistics(List<Order>? orders = null)
    {
        var data = orders ?? _mockOrders;

        var stats = new OrderStatistics
        {
            TotalOrders = data.Count,
            ProfitableOrders = data.Count(o => o.Margin.Value > 0),
            LosingOrders = data.Count(o => o.Margin.Value < 0),
            TotalMargin = data.Sum(o => o.Margin.Value),
            TotalRevenue = data.Sum(o => o.Revenue.Total),
            TotalCosts = data.Sum(o => o.Costs.Total)
        };

        if (stats.TotalOrders > 0)
        {
            stats.ProfitablePercentage = (decimal)stats.ProfitableOrders / stats.TotalOrders * 100;
            stats.LosingPercentage = (decimal)stats.LosingOrders / stats.TotalOrders * 100;
        }

        return stats;
    }

    public List<string> GetSuppliers() =>
        _mockOrders.Select(o => o.Supplier).Distinct().OrderBy(s => s).ToList();

    public List<string> GetWarehouses() =>
        _mockOrders.Select(o => o.Warehouse).Distinct().OrderBy(w => w).ToList();

    public List<string> GetCouriers() =>
        _mockOrders.Select(o => o.Courier).Distinct().OrderBy(c => c).ToList();

    public List<string> GetMarketplaces() =>
        _mockOrders.Select(o => o.Marketplace).Distinct().OrderBy(m => m).ToList();
}

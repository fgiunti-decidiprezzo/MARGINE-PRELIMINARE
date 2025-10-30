namespace OrderMarginAnalysis.Models;

public class Revenue
{
    public decimal ProductValue { get; set; }
    public decimal ShippingValue { get; set; }
    public decimal Discounts { get; set; }
    public decimal Total { get; set; }
}

public class Costs
{
    public decimal ProductCost { get; set; }
    public decimal ShippingCost { get; set; }
    public decimal Commissions { get; set; }
    public decimal Total { get; set; }
}

public class Margin
{
    public decimal Value { get; set; }
    public decimal Percentage { get; set; }
}

public class Shipment
{
    public string TrackingNumber { get; set; } = string.Empty;
    public string Marketplace { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public DateTime? ShippingDate { get; set; }
    public string Courier { get; set; } = string.Empty;
    public Revenue Revenue { get; set; } = new();
    public Costs Costs { get; set; } = new();
    public Margin Margin { get; set; } = new();
    public bool HasValidProductCost { get; set; }
    public bool HasValidShippingCost { get; set; }
}

public class Order
{
    public string Id { get; set; } = string.Empty;
    public string Marketplace { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public DateTime? OrderDate { get; set; }
    public DateTime? FulfillmentDate { get; set; }
    public string Supplier { get; set; } = string.Empty;
    public string Warehouse { get; set; } = string.Empty;
    public string Courier { get; set; } = string.Empty;
    public Revenue Revenue { get; set; } = new();
    public Costs Costs { get; set; } = new();
    public Margin Margin { get; set; } = new();
    public bool HasValidProductCost { get; set; }
    public bool HasValidShippingCost { get; set; }
    public List<Shipment> Shipments { get; set; } = new();
    public bool IsExpanded { get; set; }
}

public class OrderFilters
{
    public string? SearchQuery { get; set; }
    public DateTime? DateFrom { get; set; }
    public DateTime? DateTo { get; set; }
    public string? Marketplace { get; set; }
    public string? Supplier { get; set; }
    public string? Warehouse { get; set; }
    public string? Courier { get; set; }
    public string? ProductCostStatus { get; set; }
    public string? ShippingCostStatus { get; set; }
}

public class OrderStatistics
{
    public int TotalOrders { get; set; }
    public int ProfitableOrders { get; set; }
    public int LosingOrders { get; set; }
    public decimal ProfitablePercentage { get; set; }
    public decimal LosingPercentage { get; set; }
    public decimal TotalMargin { get; set; }
    public decimal TotalRevenue { get; set; }
    public decimal TotalCosts { get; set; }
}

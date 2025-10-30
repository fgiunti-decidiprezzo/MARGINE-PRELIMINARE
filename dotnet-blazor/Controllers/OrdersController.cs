using Microsoft.AspNetCore.Mvc;
using OrderMarginAnalysis.Models;
using OrderMarginAnalysis.Services;

namespace OrderMarginAnalysis.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly MockDataService _mockDataService;

    public OrdersController(MockDataService mockDataService)
    {
        _mockDataService = mockDataService;
    }

    /// <summary>
    /// Get all orders with optional filters
    /// </summary>
    /// <param name="searchQuery">Search in ID, customer name, or tracking number</param>
    /// <param name="dateFrom">Filter by order date from</param>
    /// <param name="dateTo">Filter by order date to</param>
    /// <param name="marketplace">Filter by marketplace</param>
    /// <param name="supplier">Filter by supplier</param>
    /// <param name="warehouse">Filter by warehouse</param>
    /// <param name="courier">Filter by courier</param>
    /// <param name="productCostStatus">Filter by product cost validation (OK/KO)</param>
    /// <param name="shippingCostStatus">Filter by shipping cost validation (OK/KO)</param>
    /// <returns>List of orders matching the filters</returns>
    [HttpGet]
    public ActionResult<List<Order>> GetOrders(
        [FromQuery] string? searchQuery = null,
        [FromQuery] DateTime? dateFrom = null,
        [FromQuery] DateTime? dateTo = null,
        [FromQuery] string? marketplace = null,
        [FromQuery] string? supplier = null,
        [FromQuery] string? warehouse = null,
        [FromQuery] string? courier = null,
        [FromQuery] string? productCostStatus = null,
        [FromQuery] string? shippingCostStatus = null)
    {
        var filters = new OrderFilters
        {
            SearchQuery = searchQuery,
            DateFrom = dateFrom,
            DateTo = dateTo,
            Marketplace = marketplace,
            Supplier = supplier,
            Warehouse = warehouse,
            Courier = courier,
            ProductCostStatus = productCostStatus,
            ShippingCostStatus = shippingCostStatus
        };

        var orders = _mockDataService.GetOrders(filters);
        return Ok(orders);
    }

    /// <summary>
    /// Get order by ID
    /// </summary>
    /// <param name="id">Order ID</param>
    /// <returns>Order with the specified ID</returns>
    [HttpGet("{id}")]
    public ActionResult<Order> GetOrderById(string id)
    {
        var order = _mockDataService.GetOrders()
            .FirstOrDefault(o => o.Id == id);

        if (order == null)
            return NotFound(new { message = $"Order {id} not found" });

        return Ok(order);
    }

    /// <summary>
    /// Get statistics for all orders or filtered orders
    /// </summary>
    /// <param name="searchQuery">Search in ID, customer name, or tracking number</param>
    /// <param name="dateFrom">Filter by order date from</param>
    /// <param name="dateTo">Filter by order date to</param>
    /// <param name="marketplace">Filter by marketplace</param>
    /// <param name="supplier">Filter by supplier</param>
    /// <param name="warehouse">Filter by warehouse</param>
    /// <param name="courier">Filter by courier</param>
    /// <param name="productCostStatus">Filter by product cost validation (OK/KO)</param>
    /// <param name="shippingCostStatus">Filter by shipping cost validation (OK/KO)</param>
    /// <returns>Statistics object</returns>
    [HttpGet("statistics")]
    public ActionResult<OrderStatistics> GetStatistics(
        [FromQuery] string? searchQuery = null,
        [FromQuery] DateTime? dateFrom = null,
        [FromQuery] DateTime? dateTo = null,
        [FromQuery] string? marketplace = null,
        [FromQuery] string? supplier = null,
        [FromQuery] string? warehouse = null,
        [FromQuery] string? courier = null,
        [FromQuery] string? productCostStatus = null,
        [FromQuery] string? shippingCostStatus = null)
    {
        var filters = new OrderFilters
        {
            SearchQuery = searchQuery,
            DateFrom = dateFrom,
            DateTo = dateTo,
            Marketplace = marketplace,
            Supplier = supplier,
            Warehouse = warehouse,
            Courier = courier,
            ProductCostStatus = productCostStatus,
            ShippingCostStatus = shippingCostStatus
        };

        var orders = _mockDataService.GetOrders(filters);
        var stats = _mockDataService.GetStatistics(orders);
        return Ok(stats);
    }

    /// <summary>
    /// Get list of all suppliers
    /// </summary>
    /// <returns>List of supplier names</returns>
    [HttpGet("suppliers")]
    public ActionResult<List<string>> GetSuppliers()
    {
        return Ok(_mockDataService.GetSuppliers());
    }

    /// <summary>
    /// Get list of all warehouses
    /// </summary>
    /// <returns>List of warehouse names</returns>
    [HttpGet("warehouses")]
    public ActionResult<List<string>> GetWarehouses()
    {
        return Ok(_mockDataService.GetWarehouses());
    }

    /// <summary>
    /// Get list of all couriers
    /// </summary>
    /// <returns>List of courier names</returns>
    [HttpGet("couriers")]
    public ActionResult<List<string>> GetCouriers()
    {
        return Ok(_mockDataService.GetCouriers());
    }

    /// <summary>
    /// Get list of all marketplaces
    /// </summary>
    /// <returns>List of marketplace names</returns>
    [HttpGet("marketplaces")]
    public ActionResult<List<string>> GetMarketplaces()
    {
        return Ok(_mockDataService.GetMarketplaces());
    }
}

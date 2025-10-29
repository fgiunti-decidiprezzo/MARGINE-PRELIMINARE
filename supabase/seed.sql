-- =====================================================
-- SEED DATA - Dati di esempio
-- =====================================================

-- Ordine 1: Amazon - 2 spedizioni - IN PROFITTO
INSERT INTO orders (
    id, marketplace, customer_name, order_date, fulfillment_date,
    supplier, warehouse, courier,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_costs, has_valid_shipping_costs
) VALUES (
    'ORD-001', 'Amazon', 'Mario Rossi', '2025-01-15 10:30:00+00', '2025-01-16 14:20:00+00',
    'Fornitore A', 'Magazzino A', 'DHL',
    250.00, 15.00, 0.00, 265.00,
    180.00, 12.00, 26.50, 218.50,
    46.50, 17.55,
    true, true
);

INSERT INTO shipments (
    id, order_id, tracking_number, marketplace, customer_name, quantity,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_cost, has_valid_shipping_cost
) VALUES
    ('ORD-001-1', 'ORD-001', 'TRK001234567', 'Amazon', 'Mario Rossi', 1,
     120.00, 8.00, 0.00, 128.00,
     85.00, 6.00, 12.80, 103.80,
     24.20, 18.91,
     true, true),
    ('ORD-001-2', 'ORD-001', 'TRK001234568', 'Amazon', 'Mario Rossi', 1,
     130.00, 7.00, 0.00, 137.00,
     95.00, 6.00, 13.70, 114.70,
     22.30, 16.28,
     true, true);

-- Ordine 2: eBay - 1 spedizione - IN PERDITA (costi non validi)
INSERT INTO orders (
    id, marketplace, customer_name, order_date, fulfillment_date,
    supplier, warehouse, courier,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_costs, has_valid_shipping_costs
) VALUES (
    'ORD-002', 'eBay', 'Giulia Bianchi', '2025-01-16 09:15:00+00', '2025-01-17 11:30:00+00',
    'Fornitore B', 'Magazzino B', 'UPS',
    89.90, 9.90, 5.00, 94.80,
    95.00, 12.00, 9.48, 116.48,
    -21.68, -22.87,
    false, false
);

INSERT INTO shipments (
    id, order_id, tracking_number, marketplace, customer_name, quantity,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_cost, has_valid_shipping_cost
) VALUES
    ('ORD-002-1', 'ORD-002', 'TRK002345678', 'eBay', 'Giulia Bianchi', 1,
     89.90, 9.90, 5.00, 94.80,
     95.00, 12.00, 9.48, 116.48,
     -21.68, -22.87,
     false, false);

-- Ordine 3: Sito Web - 1 spedizione - MARGINE ZERO
INSERT INTO orders (
    id, marketplace, customer_name, order_date, fulfillment_date,
    supplier, warehouse, courier,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_costs, has_valid_shipping_costs
) VALUES (
    'ORD-003', 'Sito Web', 'Luca Verdi', '2025-01-17 14:45:00+00', NULL,
    'Fornitore C', 'Magazzino A', 'GLS',
    150.00, 12.00, 0.00, 162.00,
    150.00, 12.00, 0.00, 162.00,
    0.00, 0.00,
    true, true
);

INSERT INTO shipments (
    id, order_id, tracking_number, marketplace, customer_name, quantity,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_cost, has_valid_shipping_cost
) VALUES
    ('ORD-003-1', 'ORD-003', 'TRK003456789', 'Sito Web', 'Luca Verdi', 1,
     150.00, 12.00, 0.00, 162.00,
     150.00, 12.00, 0.00, 162.00,
     0.00, 0.00,
     true, true);

-- Ordine 4: Amazon - 3 spedizioni - IN PROFITTO
INSERT INTO orders (
    id, marketplace, customer_name, order_date, fulfillment_date,
    supplier, warehouse, courier,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_costs, has_valid_shipping_costs
) VALUES (
    'ORD-004', 'Amazon', 'Anna Neri', '2025-01-18 11:20:00+00', '2025-01-19 15:10:00+00',
    'Fornitore A', 'Magazzino B', 'BRT',
    450.00, 25.00, 15.00, 460.00,
    320.00, 22.00, 46.00, 388.00,
    72.00, 15.65,
    true, true
);

INSERT INTO shipments (
    id, order_id, tracking_number, marketplace, customer_name, quantity,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_cost, has_valid_shipping_cost
) VALUES
    ('ORD-004-1', 'ORD-004', 'TRK004567890', 'Amazon', 'Anna Neri', 1,
     150.00, 8.00, 5.00, 153.00,
     110.00, 7.00, 15.30, 132.30,
     20.70, 13.53,
     true, true),
    ('ORD-004-2', 'ORD-004', 'TRK004567891', 'Amazon', 'Anna Neri', 1,
     180.00, 9.00, 5.00, 184.00,
     125.00, 8.00, 18.40, 151.40,
     32.60, 17.72,
     true, true),
    ('ORD-004-3', 'ORD-004', 'TRK004567892', 'Amazon', 'Anna Neri', 1,
     120.00, 8.00, 5.00, 123.00,
     85.00, 7.00, 12.30, 104.30,
     18.70, 15.20,
     true, true);

-- Ordine 5: eBay - 2 spedizioni - IN PERDITA
INSERT INTO orders (
    id, marketplace, customer_name, order_date, fulfillment_date,
    supplier, warehouse, courier,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_costs, has_valid_shipping_costs
) VALUES (
    'ORD-005', 'eBay', 'Paolo Gialli', '2025-01-19 16:30:00+00', '2025-01-20 10:00:00+00',
    'Fornitore B', 'Magazzino A', 'SDA',
    199.90, 14.90, 20.00, 194.80,
    185.00, 18.00, 19.48, 222.48,
    -27.68, -14.21,
    true, false
);

INSERT INTO shipments (
    id, order_id, tracking_number, marketplace, customer_name, quantity,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage,
    has_valid_product_cost, has_valid_shipping_cost
) VALUES
    ('ORD-005-1', 'ORD-005', 'TRK005678901', 'eBay', 'Paolo Gialli', 1,
     99.95, 7.45, 10.00, 97.40,
     95.00, 9.00, 9.74, 113.74,
     -16.34, -16.78,
     true, false),
    ('ORD-005-2', 'ORD-005', 'TRK005678902', 'eBay', 'Paolo Gialli', 1,
     99.95, 7.45, 10.00, 97.40,
     90.00, 9.00, 9.74, 108.74,
     -11.34, -11.64,
     true, false);

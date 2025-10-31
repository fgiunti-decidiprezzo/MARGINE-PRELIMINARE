-- =====================================================
-- SCHEMA DATABASE SUPABASE
-- Sistema Analisi Margine Operativo
-- =====================================================

-- Tabella Ordini
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    marketplace TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    order_date TIMESTAMPTZ NOT NULL,
    fulfillment_date TIMESTAMPTZ,
    supplier TEXT,
    warehouse TEXT,
    courier TEXT,

    -- Revenue
    product_value DECIMAL(10,2) NOT NULL,
    shipping_value DECIMAL(10,2) NOT NULL,
    discounts DECIMAL(10,2) DEFAULT 0,
    revenue_total DECIMAL(10,2) NOT NULL,

    -- Costs
    product_cost DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL,
    commissions DECIMAL(10,2) NOT NULL,
    costs_total DECIMAL(10,2) NOT NULL,

    -- Margin
    margin_value DECIMAL(10,2) NOT NULL,
    margin_percentage DECIMAL(5,2) NOT NULL,

    -- Validation
    has_valid_product_costs BOOLEAN DEFAULT true,
    has_valid_shipping_costs BOOLEAN DEFAULT true,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella Spedizioni
CREATE TABLE shipments (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    tracking_number TEXT,
    marketplace TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,

    -- Revenue
    product_value DECIMAL(10,2) NOT NULL,
    shipping_value DECIMAL(10,2) NOT NULL,
    discounts DECIMAL(10,2) DEFAULT 0,
    revenue_total DECIMAL(10,2) NOT NULL,

    -- Costs
    product_cost DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL,
    commissions DECIMAL(10,2) NOT NULL,
    costs_total DECIMAL(10,2) NOT NULL,

    -- Margin
    margin_value DECIMAL(10,2) NOT NULL,
    margin_percentage DECIMAL(5,2) NOT NULL,

    -- Validation
    has_valid_product_cost BOOLEAN DEFAULT true,
    has_valid_shipping_cost BOOLEAN DEFAULT true,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per performance
CREATE INDEX idx_orders_marketplace ON orders(marketplace);
CREATE INDEX idx_orders_supplier ON orders(supplier);
CREATE INDEX idx_orders_warehouse ON orders(warehouse);
CREATE INDEX idx_orders_courier ON orders(courier);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_orders_fulfillment_date ON orders(fulfillment_date);
CREATE INDEX idx_shipments_order_id ON shipments(order_id);
CREATE INDEX idx_shipments_tracking ON shipments(tracking_number);

-- Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

-- Policy: Tutti possono leggere (per demo)
CREATE POLICY "Enable read access for all users" ON orders FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON shipments FOR SELECT USING (true);

-- Funzione per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

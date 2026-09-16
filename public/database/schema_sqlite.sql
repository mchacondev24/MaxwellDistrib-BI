
    -- =========================================================================
    -- MaxwellDistrib BI (Demo para Portafolio) - SQLite Star Schema
    -- Base de datos analítica autónoma y portátil
    -- =========================================================================

    CREATE TABLE IF NOT EXISTS dim_fecha (
        date_key INTEGER PRIMARY KEY,
        fecha TEXT NOT NULL UNIQUE,
        anio INTEGER NOT NULL,
        mes INTEGER NOT NULL,
        nombre_mes TEXT NOT NULL,
        trimestre INTEGER NOT NULL,
        dia INTEGER NOT NULL,
        dia_semana TEXT NOT NULL,
        es_fin_semana INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS dim_producto (
        product_key INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_producto TEXT NOT NULL UNIQUE,
        nombre_producto TEXT NOT NULL,
        categoria TEXT NOT NULL,
        costo_estandar_cordobas REAL NOT NULL DEFAULT 0.0,
        precio_lista_cordobas REAL NOT NULL DEFAULT 0.0
    );

    CREATE TABLE IF NOT EXISTS dim_cliente (
        customer_key INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_cliente TEXT NOT NULL UNIQUE,
        nombre_cliente TEXT NOT NULL,
        tipo_cliente TEXT NOT NULL DEFAULT 'Detallista',
        departamento TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dim_sucursal (
        branch_key INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_sucursal TEXT NOT NULL UNIQUE,
        nombre_sucursal TEXT NOT NULL,
        departamento TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dim_proveedor (
        supplier_key INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_proveedor TEXT NOT NULL UNIQUE,
        nombre_proveedor TEXT NOT NULL,
        contacto TEXT,
        lead_time_nominal_dias INTEGER NOT NULL DEFAULT 3
    );

    CREATE TABLE IF NOT EXISTS fact_ventas (
        sales_id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_transaccion TEXT NOT NULL UNIQUE,
        date_key INTEGER NOT NULL,
        product_key INTEGER NOT NULL,
        customer_key INTEGER NOT NULL,
        branch_key INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        precio_unitario_cordobas REAL NOT NULL,
        subtotal_cordobas REAL NOT NULL,
        impuesto_iva_cordobas REAL NOT NULL,
        total_venta_cordobas REAL NOT NULL,
        costo_total_cordobas REAL NOT NULL,
        utilidad_bruta_cordobas REAL NOT NULL,
        margen_bruto_pct REAL NOT NULL,
        FOREIGN KEY (date_key) REFERENCES dim_fecha(date_key),
        FOREIGN KEY (product_key) REFERENCES dim_producto(product_key),
        FOREIGN KEY (customer_key) REFERENCES dim_cliente(customer_key),
        FOREIGN KEY (branch_key) REFERENCES dim_sucursal(branch_key)
    );

    CREATE TABLE IF NOT EXISTS fact_compras (
        purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_orden_compra TEXT NOT NULL UNIQUE,
        date_key INTEGER NOT NULL,
        product_key INTEGER NOT NULL,
        supplier_key INTEGER NOT NULL,
        branch_key INTEGER NOT NULL,
        cantidad_ordenada INTEGER NOT NULL,
        cantidad_recibida INTEGER NOT NULL,
        costo_unitario_cordobas REAL NOT NULL,
        costo_total_compra_cordobas REAL NOT NULL,
        dias_entrega_reales INTEGER NOT NULL,
        retraso_entrega_dias INTEGER NOT NULL,
        pedido_a_tiempo INTEGER NOT NULL,
        FOREIGN KEY (date_key) REFERENCES dim_fecha(date_key),
        FOREIGN KEY (product_key) REFERENCES dim_producto(product_key),
        FOREIGN KEY (supplier_key) REFERENCES dim_proveedor(supplier_key),
        FOREIGN KEY (branch_key) REFERENCES dim_sucursal(branch_key)
    );

    CREATE TABLE IF NOT EXISTS fact_inventario (
        inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_key INTEGER NOT NULL,
        product_key INTEGER NOT NULL,
        branch_key INTEGER NOT NULL,
        stock_disponible_unidades INTEGER NOT NULL,
        stock_minimo_seguridad INTEGER NOT NULL,
        punto_reorden INTEGER NOT NULL,
        costo_unitario_cordobas REAL NOT NULL,
        valor_inventario_cordobas REAL NOT NULL,
        dias_cobertura_proyectados REAL NOT NULL,
        estado_abastecimiento TEXT NOT NULL,
        FOREIGN KEY (date_key) REFERENCES dim_fecha(date_key),
        FOREIGN KEY (product_key) REFERENCES dim_producto(product_key),
        FOREIGN KEY (branch_key) REFERENCES dim_sucursal(branch_key)
    );

    CREATE INDEX IF NOT EXISTS idx_ventas_fecha ON fact_ventas(date_key);
    CREATE INDEX IF NOT EXISTS idx_ventas_prod ON fact_ventas(product_key);
    CREATE INDEX IF NOT EXISTS idx_compras_prov ON fact_compras(supplier_key);
    CREATE INDEX IF NOT EXISTS idx_inv_estado ON fact_inventario(estado_abastecimiento);
    
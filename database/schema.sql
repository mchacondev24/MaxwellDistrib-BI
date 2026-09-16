-- =====================================================================
-- NicaDistrib BI - Modelo Dimensional (Star Schema) para MySQL 8+
-- Data Warehouse para Distribución Comercial en Nicaragua
-- Portafolio de Ing. Maxwell Chacón - Analista de Datos & Business Intelligence
-- Datos ficticios generados con fines demostrativos y educativos
-- =====================================================================

CREATE DATABASE IF NOT EXISTS ingefknc_nicadistrib_dw
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ingefknc_nicadistrib_dw;

-- ---------------------------------------------------------------------
-- 1. DIMENSIONES (DIMENSION TABLES)
-- ---------------------------------------------------------------------

-- Dimensión Fecha (Grano: Día calendario)
CREATE TABLE IF NOT EXISTS dim_fecha (
    date_key INT PRIMARY KEY COMMENT 'Formato YYYYMMDD ej. 20260115',
    fecha DATE NOT NULL UNIQUE,
    anio SMALLINT NOT NULL,
    mes TINYINT NOT NULL,
    nombre_mes VARCHAR(20) NOT NULL,
    trimestre TINYINT NOT NULL,
    dia TINYINT NOT NULL,
    dia_semana VARCHAR(15) NOT NULL,
    es_fin_semana BOOLEAN NOT NULL DEFAULT FALSE,
    INDEX idx_fecha_mes_anio (anio, mes)
) ENGINE=InnoDB COMMENT='Dimensión temporal para análisis de tendencias y estacionalidad';

-- Dimensión Producto (Grano: SKU o producto comercial)
CREATE TABLE IF NOT EXISTS dim_producto (
    product_key INT AUTO_INCREMENT PRIMARY KEY,
    codigo_producto VARCHAR(50) NOT NULL UNIQUE COMMENT 'Business Key ej. PROD-001',
    nombre_producto VARCHAR(150) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    costo_estandar_cordobas DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    precio_lista_cordobas DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    INDEX idx_prod_categoria (categoria)
) ENGINE=InnoDB COMMENT='Catálogo dimensional de productos y categorías';

-- Dimensión Cliente (Grano: Cliente / Punto de Venta)
CREATE TABLE IF NOT EXISTS dim_cliente (
    customer_key INT AUTO_INCREMENT PRIMARY KEY,
    codigo_cliente VARCHAR(50) NOT NULL UNIQUE COMMENT 'Business Key ej. CLI-001',
    nombre_cliente VARCHAR(150) NOT NULL,
    tipo_cliente VARCHAR(50) NOT NULL DEFAULT 'Detallista',
    departamento VARCHAR(80) NOT NULL COMMENT 'Departamento de Nicaragua ej. Managua, León',
    INDEX idx_cli_depto (departamento)
) ENGINE=InnoDB COMMENT='Dimensión de clientes y localización geográfica en Nicaragua';

-- Dimensión Proveedor (Grano: Proveedor comercial)
CREATE TABLE IF NOT EXISTS dim_proveedor (
    supplier_key INT AUTO_INCREMENT PRIMARY KEY,
    codigo_proveedor VARCHAR(50) NOT NULL UNIQUE COMMENT 'Business Key ej. PROV-001',
    nombre_proveedor VARCHAR(150) NOT NULL,
    contacto VARCHAR(100),
    lead_time_nominal_dias INT NOT NULL DEFAULT 3,
    INDEX idx_prov_nombre (nombre_proveedor)
) ENGINE=InnoDB COMMENT='Proveedores y tiempos teóricos de entrega';

-- Dimensión Sucursal (Grano: Centro de distribución o sucursal departamental)
CREATE TABLE IF NOT EXISTS dim_sucursal (
    branch_key INT AUTO_INCREMENT PRIMARY KEY,
    codigo_sucursal VARCHAR(50) NOT NULL UNIQUE,
    nombre_sucursal VARCHAR(100) NOT NULL,
    departamento VARCHAR(80) NOT NULL,
    INDEX idx_suc_depto (departamento)
) ENGINE=InnoDB COMMENT='Sucursales de distribución en el territorio nacional';

-- Dimensión Vendedor
CREATE TABLE IF NOT EXISTS dim_vendedor (
    employee_key INT AUTO_INCREMENT PRIMARY KEY,
    codigo_vendedor VARCHAR(50) NOT NULL UNIQUE,
    nombre_vendedor VARCHAR(120) NOT NULL,
    zona_asignada VARCHAR(80) NOT NULL
) ENGINE=InnoDB COMMENT='Fuerza de ventas y zonificación';

-- ---------------------------------------------------------------------
-- 2. TABLAS DE HECHOS (FACT TABLES)
-- ---------------------------------------------------------------------

-- Hechos de Ventas (Grano: Línea de factura o transacción de venta)
CREATE TABLE IF NOT EXISTS fact_ventas (
    sales_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_transaccion VARCHAR(60) NOT NULL UNIQUE COMMENT 'Identificador único transaccional',
    date_key INT NOT NULL,
    product_key INT,
    customer_key INT,
    employee_key INT,
    branch_key INT,
    codigo_producto VARCHAR(50) NOT NULL,
    codigo_cliente VARCHAR(50) NOT NULL,
    codigo_vendedor VARCHAR(50),
    codigo_sucursal VARCHAR(50),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario_cordobas DECIMAL(12,2) NOT NULL,
    costo_unitario_cordobas DECIMAL(12,2) NOT NULL,
    subtotal_cordobas DECIMAL(14,2) NOT NULL,
    impuesto_iva_cordobas DECIMAL(14,2) NOT NULL,
    total_venta_cordobas DECIMAL(14,2) NOT NULL,
    costo_total_cordobas DECIMAL(14,2) NOT NULL,
    utilidad_bruta_cordobas DECIMAL(14,2) NOT NULL,
    margen_bruto_pct DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ventas_fecha FOREIGN KEY (date_key) REFERENCES dim_fecha(date_key),
    INDEX idx_ventas_date (date_key),
    INDEX idx_ventas_producto (codigo_producto),
    INDEX idx_ventas_cliente (codigo_cliente)
) ENGINE=InnoDB COMMENT='Métricas acumuladas de transacciones de ventas';

-- Hechos de Compras (Grano: Orden de compra a proveedor)
CREATE TABLE IF NOT EXISTS fact_compras (
    purchase_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_orden_compra VARCHAR(60) NOT NULL UNIQUE,
    date_key INT NOT NULL,
    supplier_key INT,
    product_key INT,
    branch_key INT,
    codigo_proveedor VARCHAR(50) NOT NULL,
    codigo_producto VARCHAR(50) NOT NULL,
    codigo_sucursal VARCHAR(50) NOT NULL,
    cantidad_comprada INT NOT NULL,
    costo_unitario_cordobas DECIMAL(12,2) NOT NULL,
    total_compra_cordobas DECIMAL(14,2) NOT NULL,
    lead_time_real_dias INT NOT NULL,
    dias_retraso INT NOT NULL DEFAULT 0,
    estado_entrega VARCHAR(30) NOT NULL DEFAULT 'A Tiempo',
    unidades_devueltas INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_compras_fecha (date_key),
    INDEX idx_compras_prov (codigo_proveedor)
) ENGINE=InnoDB COMMENT='Historial de compras y rendimiento de proveedores';

-- Hechos de Inventario (Grano: Snapshot de stock por producto y sucursal)
CREATE TABLE IF NOT EXISTS fact_inventario (
    inventory_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_key INT NOT NULL,
    branch_key INT,
    product_key INT,
    codigo_sucursal VARCHAR(50) NOT NULL,
    codigo_producto VARCHAR(50) NOT NULL,
    stock_actual INT NOT NULL,
    stock_minimo INT NOT NULL,
    stock_maximo INT NOT NULL,
    punto_reorden INT NOT NULL,
    costo_promedio_cordobas DECIMAL(12,2) NOT NULL,
    valor_total_inventario_cordobas DECIMAL(14,2) NOT NULL,
    rotacion_anualizada DECIMAL(6,2) DEFAULT 0.00,
    dias_inventario DECIMAL(6,1) DEFAULT 0.0,
    clasificacion_velocidad VARCHAR(30) NOT NULL DEFAULT 'MEDIA ROTACIÓN',
    estado_stock VARCHAR(30) NOT NULL DEFAULT 'NORMAL',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_suc_prod_fecha (codigo_sucursal, codigo_producto, date_key),
    INDEX idx_inv_prod (codigo_producto)
) ENGINE=InnoDB COMMENT='Foto periódica de existencias y valorización de inventario';

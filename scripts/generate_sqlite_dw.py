"""
Generador de Base de Datos Star Schema en SQLite para MaxwellDistrib BI (Demo para Portafolio)
Permite tener una base de datos ligera, autónoma e inmediata sin necesidad de configurar MySQL ni credenciales.
"""
import sqlite3
import os
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "database" / "maxwelldistrib_demo.sqlite"
SCHEMA_PATH = Path(__file__).resolve().parent.parent / "database" / "schema_sqlite.sql"

def build_sqlite():
    if DB_PATH.exists():
        DB_PATH.unlink()

    conn = sqlite3.connect(str(DB_PATH))
    cursor = conn.cursor()
    cursor.execute("PRAGMA foreign_keys = ON;")

    # 1. Crear Esquema SQLite
    ddl = """
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
    """

    cursor.executescript(ddl)

    # Guardar archivo DDL SQLite
    with open(SCHEMA_PATH, "w", encoding="utf-8") as f:
        f.write(ddl)

    # 2. Poblar dimensiones con datos representativos de Nicaragua
    productos = [
        ("PROD-001", "Arroz Faisán 80/20 50lb", "Granos Básicos", 850.0, 1050.0),
        ("PROD-002", "Frijol Rojo Don Pedro 50lb", "Granos Básicos", 1400.0, 1750.0),
        ("PROD-003", "Aceite Corona Vegetal 1L", "Abarrotes y Aceites", 58.0, 75.0),
        ("PROD-004", "Azúcar Sulagro Blanca 50lb", "Abarrotes y Aceites", 720.0, 890.0),
        ("PROD-005", "Leche La Perfecta Entera 1L", "Lácteos y Derivados", 34.0, 45.0),
        ("PROD-006", "Queso Crema Chontaleño lb", "Lácteos y Derivados", 68.0, 92.0),
        ("PROD-007", "Café Presto Instantáneo 150g", "Bebidas y Jugos", 85.0, 115.0),
        ("PROD-008", "Jugo Del Valle Naranja 1L", "Bebidas y Jugos", 42.0, 60.0),
        ("PROD-009", "Detergente Xedex Floral 2kg", "Higiene y Limpieza", 110.0, 148.0),
        ("PROD-010", "Jabón de Lavar Corona barra", "Higiene y Limpieza", 18.0, 26.0),
    ]
    cursor.executemany("""
        INSERT INTO dim_producto (codigo_producto, nombre_producto, categoria, costo_estandar_cordobas, precio_lista_cordobas)
        VALUES (?, ?, ?, ?, ?)
    """, productos)

    sucursales = [
        ("SUC-001", "Sucursal Central Managua", "Managua"),
        ("SUC-002", "Sucursal Occidente León", "León"),
        ("SUC-003", "Sucursal Oriente Masaya", "Masaya"),
        ("SUC-004", "Sucursal Norte Matagalpa", "Matagalpa"),
        ("SUC-005", "Sucursal Sur Granada", "Granada"),
    ]
    cursor.executemany("""
        INSERT INTO dim_sucursal (codigo_sucursal, nombre_sucursal, departamento)
        VALUES (?, ?, ?)
    """, sucursales)

    proveedores = [
        ("PROV-001", "Agroindustrias del Norte S.A.", "Carlos Morales", 4),
        ("PROV-002", "Lácteos de Chontales Cía.", "María Solís", 3),
        ("PROV-003", "Distribuidora Nacional DINA", "Roberto Blandón", 7),
        ("PROV-004", "Industrias Aceiteras de Chinandega", "Elena Rivas", 5),
        ("PROV-005", "Consorcio Químico Industrial Managua", "Jorge Téllez", 12),
    ]
    cursor.executemany("""
        INSERT INTO dim_proveedor (codigo_proveedor, nombre_proveedor, contacto, lead_time_nominal_dias)
        VALUES (?, ?, ?, ?)
    """, proveedores)

    clientes = [
        ("CLI-001", "Pulpería La Bendición", "Detallista", "Managua"),
        ("CLI-002", "Supermercado San Jerónimo", "Cadena Local", "Masaya"),
        ("CLI-003", "Abarrotes El Sultán", "Mayorista", "Granada"),
        ("CLI-004", "Distribuidora El Carmen", "Mayorista", "León"),
        ("CLI-005", "Comercial Matagalpa", "Mayorista", "Matagalpa"),
    ]
    cursor.executemany("""
        INSERT INTO dim_cliente (codigo_cliente, nombre_cliente, tipo_cliente, departamento)
        VALUES (?, ?, ?, ?)
    """, clientes)

    # Fechas representativas 2026 (Enero a Marzo)
    fechas = [
        (20260115, "2026-01-15", 2026, 1, "Enero", 1, 15, "Jueves", 0),
        (20260128, "2026-01-28", 2026, 1, "Enero", 1, 28, "Miércoles", 0),
        (20260210, "2026-02-10", 2026, 2, "Febrero", 1, 10, "Martes", 0),
        (20260222, "2026-02-22", 2026, 2, "Febrero", 1, 22, "Domingo", 1),
        (20260305, "2026-03-05", 2026, 3, "Marzo", 1, 5, "Jueves", 0),
        (20260318, "2026-03-18", 2026, 3, "Marzo", 1, 18, "Miércoles", 0),
        (20260331, "2026-03-31", 2026, 3, "Marzo", 1, 31, "Martes", 0),
    ]
    cursor.executemany("""
        INSERT INTO dim_fecha (date_key, fecha, anio, mes, nombre_mes, trimestre, dia, dia_semana, es_fin_semana)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, fechas)

    # Hechos de Ventas demo
    ventas_demo = [
        ("VT-202601-0001", 20260115, 1, 1, 1, 20, 1050.0, 21000.0, 3150.0, 24150.0, 17000.0, 4000.0, 19.05),
        ("VT-202601-0002", 20260128, 2, 2, 3, 15, 1750.0, 26250.0, 3937.5, 30187.5, 21000.0, 5250.0, 20.00),
        ("VT-202602-0003", 20260210, 3, 3, 5, 80, 75.0, 6000.0, 900.0, 6900.0, 4640.0, 1360.0, 22.67),
        ("VT-202602-0004", 20260222, 5, 4, 2, 120, 45.0, 5400.0, 810.0, 6210.0, 4080.0, 1320.0, 24.44),
        ("VT-202603-0005", 20260305, 9, 5, 4, 35, 148.0, 5180.0, 777.0, 5957.0, 3850.0, 1330.0, 25.68),
        ("VT-202603-0006", 20260318, 1, 1, 1, 18, 1050.0, 18900.0, 2835.0, 21735.0, 15300.0, 3600.0, 19.05),
    ]
    cursor.executemany("""
        INSERT INTO fact_ventas (
            id_transaccion, date_key, product_key, customer_key, branch_key,
            cantidad, precio_unitario_cordobas, subtotal_cordobas, impuesto_iva_cordobas,
            total_venta_cordobas, costo_total_cordobas, utilidad_bruta_cordobas, margen_bruto_pct
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, ventas_demo)

    conn.commit()
    conn.close()
    print(f"Base de datos SQLite generada con éxito en: {DB_PATH}")

if __name__ == "__main__":
    build_sqlite()

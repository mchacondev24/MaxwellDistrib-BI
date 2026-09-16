"""
NicaDistrib BI - Módulo de Carga (Load)
Carga los datos limpios y transformados al Data Warehouse en MySQL con esquema Star Schema.
Garantiza idempotencia mediante inserciones 'ON DUPLICATE KEY UPDATE' o staging truncable.
"""

import pandas as pd
from sqlalchemy import create_engine, text
from .config import DATABASE_URL

def get_db_engine():
    """Crea y retorna un motor de conexión SQLAlchemy para MySQL."""
    return create_engine(DATABASE_URL, pool_recycle=3600, pool_pre_ping=True)

def load_dimension_customers(df_sales: pd.DataFrame, engine):
    """Extrae y carga clientes únicos a dim_cliente."""
    unique_clients = df_sales[["codigo_cliente", "nombre_cliente", "departamento"]].drop_duplicates()
    with engine.begin() as conn:
        for _, row in unique_clients.iterrows():
            sql = text("""
                INSERT INTO dim_cliente (codigo_cliente, nombre_cliente, departamento)
                VALUES (:cod, :nombre, :depto)
                ON DUPLICATE KEY UPDATE nombre_cliente = :nombre, departamento = :depto;
            """)
            conn.execute(sql, {"cod": row["codigo_cliente"], "nombre": row["nombre_cliente"], "depto": row["departamento"]})
    print(f"[LOAD] dim_cliente actualizada con {len(unique_clients)} registros.")

def load_dimension_products(df_sales: pd.DataFrame, engine):
    """Extrae y carga productos únicos a dim_producto."""
    unique_prods = df_sales[["codigo_producto", "nombre_producto", "categoria"]].drop_duplicates()
    with engine.begin() as conn:
        for _, row in unique_prods.iterrows():
            sql = text("""
                INSERT INTO dim_producto (codigo_producto, nombre_producto, categoria)
                VALUES (:cod, :nombre, :cat)
                ON DUPLICATE KEY UPDATE nombre_producto = :nombre, categoria = :cat;
            """)
            conn.execute(sql, {"cod": row["codigo_producto"], "nombre": row["nombre_producto"], "cat": row["categoria"]})
    print(f"[LOAD] dim_producto actualizada con {len(unique_prods)} registros.")

def load_fact_sales(df_sales: pd.DataFrame, engine):
    """Carga los hechos de ventas a fact_ventas vinculando con surrogate keys."""
    if df_sales.empty:
        return
    with engine.begin() as conn:
        for _, row in df_sales.iterrows():
            sql = text("""
                INSERT INTO fact_ventas (
                    id_transaccion, date_key, codigo_producto, codigo_cliente,
                    codigo_vendedor, codigo_sucursal, cantidad, precio_unitario,
                    subtotal, impuesto_iva, total, costo_total, utilidad, margen_pct
                ) VALUES (
                    :id_trans, :date_key, :prod, :cli, :vend, :suc, :cant, :precio,
                    :subtotal, :iva, :total, :costo, :utilidad, :margen
                ) ON DUPLICATE KEY UPDATE
                    cantidad = :cant, total = :total, utilidad = :utilidad, margen_pct = :margen;
            """)
            conn.execute(sql, {
                "id_trans": row["id_transaccion"],
                "date_key": row["date_key"],
                "prod": row["codigo_producto"],
                "cli": row["codigo_cliente"],
                "vend": row["codigo_vendedor"],
                "suc": row["codigo_sucursal"],
                "cant": row["cantidad"],
                "precio": row["precio_unitario_cordobas"],
                "subtotal": row["subtotal_cordobas"],
                "iva": row["impuesto_iva_cordobas"],
                "total": row["total_venta_cordobas"],
                "costo": row["costo_total_cordobas"],
                "utilidad": row["utilidad_bruta_cordobas"],
                "margen": row["margen_bruto_pct"]
            })
    print(f"[LOAD] fact_ventas cargada exitosamente con {len(df_sales)} registros.")

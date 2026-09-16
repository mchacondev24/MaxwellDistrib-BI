"""
NicaDistrib BI - Módulo de Transformación (Transform)
Normaliza campos de texto, convierte formatos y genera métricas analíticas calculadas.
"""

import pandas as pd
import numpy as np

def clean_text_columns(df: pd.DataFrame, text_cols: list[str]) -> pd.DataFrame:
    """Elimina espacios en blanco iniciales/finales y normaliza espacios dobles."""
    for col in text_cols:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip().str.replace(r"\s+", " ", regex=True)
    return df

def transform_sales(df: pd.DataFrame) -> pd.DataFrame:
    """
    Transforma el DataFrame de ventas válidas:
    - Normaliza nombres de producto y cliente.
    - Genera surrogate date_key (ej. 20260115) para el modelo dimensional Star Schema.
    - Calcula subtotal, IVA (15% en Nicaragua), total, costo total, utilidad bruta y margen %.
    """
    if df.empty:
        return df

    # Limpieza de textos
    df = clean_text_columns(df, ["nombre_producto", "nombre_cliente", "departamento", "nombre_vendedor"])

    # Normalizar mayúsculas/minúsculas tipo título
    df["nombre_producto"] = df["nombre_producto"].str.title()
    df["nombre_cliente"] = df["nombre_cliente"].str.title()

    # Fechas y Clave Dimensión Fecha
    df["fecha_dt"] = pd.to_datetime(df["fecha"], format="%Y-%m-%d")
    df["date_key"] = df["fecha_dt"].dt.strftime("%Y%m%d").astype(int)

    # Métricas monetarias calculadas (en Córdobas C$)
    df["subtotal_cordobas"] = df["cantidad"] * df["precio_unitario_cordobas"]
    df["impuesto_iva_cordobas"] = df["subtotal_cordobas"] * 0.15
    df["total_venta_cordobas"] = df["subtotal_cordobas"] + df["impuesto_iva_cordobas"]
    df["costo_total_cordobas"] = df["cantidad"] * df["costo_unitario_cordobas"]
    df["utilidad_bruta_cordobas"] = df["subtotal_cordobas"] - df["costo_total_cordobas"]
    df["margen_bruto_pct"] = np.where(
        df["subtotal_cordobas"] > 0,
        (df["utilidad_bruta_cordobas"] / df["subtotal_cordobas"]) * 100.0,
        0.0
    ).round(2)

    print(f"[TRANSFORM] Ventas procesadas: {len(df)} filas enriquecidas con métricas dimensionales.")
    return df

def calculate_inventory_metrics(df_inv: pd.DataFrame, df_sales: pd.DataFrame) -> pd.DataFrame:
    """
    Calcula rotación de inventario = Costo de Ventas / Inventario Promedio
    Días de inventario = 365 / Rotación
    Clasificación: Alta, Media, Baja, Sin Movimiento
    """
    if df_inv.empty:
        return df_inv

    # Calcular costo de ventas acumulado por producto
    sales_cost_per_prod = df_sales.groupby("codigo_producto")["costo_total_cordobas"].sum().to_dict() if not df_sales.empty else {}

    df_inv["costo_ventas_periodo"] = df_inv["codigo_producto"].map(sales_cost_per_prod).fillna(0.0)

    # Rotación = Costo de ventas / Valor de inventario
    df_inv["rotacion_inventario"] = np.where(
        df_inv["valor_total_inventario_cordobas"] > 0,
        (df_inv["costo_ventas_periodo"] / df_inv["valor_total_inventario_cordobas"]),
        0.0
    ).round(2)

    # Días de inventario
    df_inv["dias_inventario"] = np.where(
        df_inv["rotacion_inventario"] > 0,
        (365.0 / df_inv["rotacion_inventario"]).round(1),
        999.0
    )

    # Categorización por velocidad
    conditions = [
        (df_inv["rotacion_inventario"] >= 6.0),
        (df_inv["rotacion_inventario"] >= 3.0) & (df_inv["rotacion_inventario"] < 6.0),
        (df_inv["rotacion_inventario"] > 0) & (df_inv["rotacion_inventario"] < 3.0),
        (df_inv["rotacion_inventario"] == 0)
    ]
    labels = ["ALTA ROTACIÓN", "MEDIA ROTACIÓN", "BAJA ROTACIÓN", "SIN MOVIMIENTO"]
    df_inv["clasificacion_rotacion"] = np.select(conditions, labels, default="MEDIA ROTACIÓN")

    return df_inv

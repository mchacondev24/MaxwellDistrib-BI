"""
NicaDistrib BI - Módulo de Validación & Data Quality (Validate)
Detecta anomalías, reglas de negocio infringidas, valores nulos y registros duplicados.
Separa los registros válidos de los rechazados y emite informe de auditoría.
"""

from pathlib import Path
import pandas as pd
import numpy as np

def validate_sales_data(df: pd.DataFrame, valid_products_codes: set) -> tuple[pd.DataFrame, pd.DataFrame]:
    """
    Aplica 5 reglas de calidad de datos a las ventas:
    1. Duplicados exactos por id_transaccion.
    2. Fechas nulas o no convertibles.
    3. Cantidad estrictamente mayor que cero (> 0).
    4. Precio unitario mayor o igual que cero (>= 0).
    5. Código de producto existente en el catálogo maestro.
    """
    if df.empty:
        return df, pd.DataFrame()

    total_rows = len(df)
    rejected_records = []
    valid_indices = []

    # 1. Chequeo de duplicados
    is_duplicate = df.duplicated(subset=["id_transaccion"], keep="first")

    for idx, row in df.iterrows():
        errors = []

        # Regla 1: Duplicado
        if is_duplicate.iloc[idx]:
            errors.append("Registro duplicado en id_transaccion")

        # Regla 2: Fecha válida
        fecha_val = row.get("fecha")
        if pd.isna(fecha_val) or str(fecha_val).strip() == "" or str(fecha_val).lower() == "nan":
            errors.append("Fecha vacía o nula")
        else:
            try:
                parsed_dt = pd.to_datetime(fecha_val, format="%Y-%m-%d")
                if parsed_dt.year < 2020 or parsed_dt.year > 2030:
                    errors.append("Fecha fuera de rango temporal lógico")
            except Exception:
                errors.append(f"Formato de fecha inválido ({fecha_val})")

        # Regla 3: Cantidad positiva
        cant = row.get("cantidad")
        try:
            cant_num = float(cant)
            if cant_num <= 0:
                errors.append(f"Cantidad menor o igual a cero ({cant_num})")
        except Exception:
            errors.append("Cantidad no numérica")

        # Regla 4: Precio positivo
        precio = row.get("precio_unitario_cordobas")
        try:
            precio_num = float(precio)
            if precio_num <= 0:
                errors.append(f"Precio unitario no válido ({precio_num})")
        except Exception:
            errors.append("Precio no numérico")

        # Regla 5: Código de producto existe en maestro
        cod_prod = str(row.get("codigo_producto", "")).strip()
        if valid_products_codes and cod_prod not in valid_products_codes:
            errors.append(f"Producto inexistente en catálogo maestro ({cod_prod})")

        # Clasificación
        if errors:
            rejected_dict = row.to_dict()
            rejected_dict["motivo_rechazo"] = " | ".join(errors)
            rejected_dict["indice_original"] = idx
            rejected_records.append(rejected_dict)
        else:
            valid_indices.append(idx)

    df_valid = df.loc[valid_indices].copy()
    df_rejected = pd.DataFrame(rejected_records)

    print(f"[DATA QUALITY] Total extraído: {total_rows} | Válidos: {len(df_valid)} | Rechazados: {len(df_rejected)}")
    return df_valid, df_rejected

"""
NicaDistrib BI - Orquestador Maestro del Pipeline ETL
Ejecuta el ciclo completo:
EXTRACT (Excel crudos) -> VALIDATE (Data Quality & Rechazos) -> TRANSFORM (Métricas de BI) -> LOAD (MySQL Star Schema)
"""

import sys
import time
from datetime import datetime
from pathlib import Path
import pandas as pd

from .config import DATA_RAW_DIR, DATA_PROCESSED_DIR, DATA_REJECTED_DIR
from .extract import extract_excel_files
from .validate import validate_sales_data
from .transform import transform_sales, calculate_inventory_metrics

# Catálogo maestro de códigos válidos para validación
VALID_PRODUCTS = {
    "PROD-001", "PROD-002", "PROD-003", "PROD-004", "PROD-005",
    "PROD-006", "PROD-007", "PROD-008", "PROD-009", "PROD-010"
}

def run_etl_pipeline(simulate_db=True):
    start_time = time.time()
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"=================================================================")
    print(f"  NICADISTRIB BI - INICIO DE PIPELINE ETL: {now_str}")
    print(f"=================================================================")

    # 1. EXTRACT
    print("\n--- PASO 1: EXTRACCIÓN DE FUENTES EXCEL ---")
    df_sales_raw = extract_excel_files(DATA_RAW_DIR, "ventas_*.xlsx")
    df_purchases_raw = extract_excel_files(DATA_RAW_DIR, "compras_*.xlsx")
    df_inventory_raw = extract_excel_files(DATA_RAW_DIR, "inventario.xlsx")

    if df_sales_raw.empty:
        print("[AVISO] No hay datos de ventas en data/raw. Generando datasets...")
        from .generate_dataset import main as gen_main
        gen_main()
        df_sales_raw = extract_excel_files(DATA_RAW_DIR, "ventas_*.xlsx")
        df_purchases_raw = extract_excel_files(DATA_RAW_DIR, "compras_*.xlsx")
        df_inventory_raw = extract_excel_files(DATA_RAW_DIR, "inventario.xlsx")

    raw_sales_count = len(df_sales_raw)

    # 2. VALIDATE & DATA QUALITY
    print("\n--- PASO 2: VALIDACIÓN & REGLAS DE CALIDAD ---")
    df_sales_valid, df_sales_rejected = validate_sales_data(df_sales_raw, VALID_PRODUCTS)

    DATA_REJECTED_DIR.mkdir(parents=True, exist_ok=True)
    if not df_sales_rejected.empty:
        rejected_path = DATA_REJECTED_DIR / "ventas_rechazadas.xlsx"
        df_sales_rejected.to_excel(rejected_path, index=False)
        print(f"[REJECTED] {len(df_sales_rejected)} filas inválidas guardadas en: {rejected_path}")

    # 3. TRANSFORM
    print("\n--- PASO 3: TRANSFORMACIÓN & ENRIQUECIMIENTO ANALÍTICO ---")
    df_sales_clean = transform_sales(df_sales_valid)
    df_inventory_clean = calculate_inventory_metrics(df_inventory_raw, df_sales_clean)

    DATA_PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    df_sales_clean.to_excel(DATA_PROCESSED_DIR / "ventas_limpias.xlsx", index=False)
    if not df_purchases_raw.empty:
        df_purchases_raw.to_excel(DATA_PROCESSED_DIR / "compras_limpias.xlsx", index=False)
    if not df_inventory_clean.empty:
        df_inventory_clean.to_excel(DATA_PROCESSED_DIR / "inventario_limpio.xlsx", index=False)

    # 4. LOAD
    print("\n--- PASO 4: CARGA A DATA WAREHOUSE MYSQL (STAR SCHEMA) ---")
    if not simulate_db:
        try:
            from .load import get_db_engine, load_dimension_customers, load_dimension_products, load_fact_sales
            engine = get_db_engine()
            load_dimension_customers(df_sales_clean, engine)
            load_dimension_products(df_sales_clean, engine)
            load_fact_sales(df_sales_clean, engine)
            print("[LOAD] Carga a MySQL completada con éxito.")
        except Exception as e:
            print(f"[LOAD DB ADVERTENCIA] No se pudo conectar a MySQL local ({e}). Modo simulación activado.")
    else:
        print("[SIMULACIÓN] Modo Staging / Local: Archivos preparados en data/processed/ para Power BI y MySQL.")

    duration = round(time.time() - start_time, 2)
    print(f"\n=================================================================")
    print(f"  RESUMEN EJECUTIVO ETL:")
    print(f"  - Filas extraídas: {raw_sales_count:,}")
    print(f"  - Filas válidas cargadas: {len(df_sales_clean):,}")
    print(f"  - Filas rechazadas por Data Quality: {len(df_sales_rejected):,}")
    print(f"  - Tasa de Calidad de Datos: {(len(df_sales_clean)/raw_sales_count*100):.2f}%")
    print(f"  - Duración total: {duration} segundos")
    print(f"=================================================================\n")

if __name__ == "__main__":
    run_etl_pipeline()

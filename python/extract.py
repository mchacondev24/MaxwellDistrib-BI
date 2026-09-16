"""
NicaDistrib BI - Módulo de Extracción (Extract)
Lee múltiples archivos Excel crudos desde data/raw, registra metadatos y consolida DataFrames.
"""

from pathlib import Path
import pandas as pd

def extract_excel_files(folder_path: Path, pattern: str) -> pd.DataFrame:
    """
    Busca y concatena todos los archivos Excel que coincidan con el patrón indicado.
    Agrega la columna 'archivo_origen' para trazabilidad y auditoría de datos.
    """
    all_files = list(folder_path.glob(pattern))
    if not all_files:
        print(f"[EXTRACT] No se encontraron archivos para el patrón: {pattern}")
        return pd.DataFrame()

    dfs = []
    for file in all_files:
        try:
            df = pd.read_excel(file)
            df["archivo_origen"] = file.name
            dfs.append(df)
            print(f"[EXTRACT] Leído archivo {file.name} con {len(df)} registros.")
        except Exception as e:
            print(f"[EXTRACT ERROR] No se pudo leer {file.name}: {e}")

    consolidated_df = pd.concat(dfs, ignore_index=True) if dfs else pd.DataFrame()
    print(f"[EXTRACT TOTAL] Se consolidaron {len(consolidated_df)} filas para {pattern}.")
    return consolidated_df

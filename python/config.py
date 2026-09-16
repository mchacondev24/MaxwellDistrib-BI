"""
NicaDistrib BI - Configuración del Entorno y Base de Datos MySQL
Datos ficticios con fines demostrativos de portafolio para Ing. Maxwell Chacón
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# Configuración de Base de Datos MySQL
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_USER = os.getenv("DB_USER", "ingefknc_nicabi")
DB_PASSWORD = os.getenv("DB_PASSWORD", "ZNfXTxrhSzeQ")
DB_NAME = os.getenv("DB_NAME", "ingefknc_nicadistrib_dw")

# URL de conexión SQLAlchemy
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"

# Rutas de datos
DATA_RAW_DIR = BASE_DIR / "data" / "raw"
DATA_PROCESSED_DIR = BASE_DIR / "data" / "processed"
DATA_REJECTED_DIR = BASE_DIR / "data" / "rejected"

# Moneda oficial del proyecto
CURRENCY = "C$"
COUNTRY = "Nicaragua"

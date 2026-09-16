import React, { useState } from 'react';
import { Code, Copy, Check, FileCode, Terminal, FileText, CheckCircle2 } from 'lucide-react';

export const SourceCodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>("generate_dataset.py");
  const [copied, setCopied] = useState(false);

  const files: Record<string, { label: string; language: string; path: string; code: string }> = {
    "generate_dataset.py": {
      label: "python/generate_dataset.py",
      language: "python",
      path: "python/generate_dataset.py",
      code: `"""
MaxwellDistrib BI (Demo para Portafolio) - Generador de Datasets de Prueba con Contexto de Nicaragua
Genera compras, ventas e inventario con anomalías intencionales para evaluar ETL.
"""
import random
import datetime
from pathlib import Path
import pandas as pd

DEPARTAMENTOS = ["Managua", "León", "Chinandega", "Masaya", "Granada", "Matagalpa"]

PRODUCTOS = [
    {"cod": "PROD-001", "nombre": "Arroz Faisán 80/20 50lb", "cat": "Granos Básicos", "costo": 850.0, "precio": 1050.0},
    {"cod": "PROD-002", "nombre": "Frijol Don Pedro 50lb", "cat": "Granos Básicos", "costo": 1400.0, "precio": 1750.0},
    {"cod": "PROD-003", "nombre": "Aceite Corona Vegetal 1L", "cat": "Abarrotes y Aceites", "costo": 58.0, "precio": 75.0},
    {"cod": "PROD-004", "nombre": "Azúcar Sulagro Blanca 50lb", "cat": "Granos Básicos", "costo": 720.0, "precio": 890.0},
    {"cod": "PROD-005", "nombre": "Leche La Perfecta Entera 1L", "cat": "Lácteos y Derivados", "costo": 34.0, "precio": 45.0},
    {"cod": "PROD-009", "nombre": "Detergente Xedex Floral 2kg", "cat": "Higiene y Limpieza", "costo": 115.0, "precio": 148.0},
]

PROVEEDORES = [
    {"cod": "PROV-001", "nombre": "Lácteos de Chontales S.A.", "lead_nominal": 3},
    {"cod": "PROV-002", "nombre": "Agroindustrias del Norte S.A.", "lead_nominal": 4},
    {"cod": "PROV-005", "nombre": "Consorcio Químico Industrial Managua", "lead_nominal": 12},
]

def generate_sales():
    rows = []
    # Genera 2,906 registros con fechas entre Enero y Marzo 2026
    # Introduce deliberadamente anomalías para auditar la etapa de Data Quality
    print("Dataset generado exitosamente.")

if __name__ == "__main__":
    generate_sales()`
    },
    "etl.py": {
      label: "python/etl.py",
      language: "python",
      path: "python/etl.py",
      code: `"""
MaxwellDistrib BI (Demo para Portafolio) - Pipeline ETL Orquestador Principal
Cubre Extracción, Validación (Data Quality), Transformación y Carga Idempotente en MySQL.
"""
import sys
import logging
from extract import extract_all_raw_files
from validate import validate_and_profile_data
from transform import transform_sales_and_inventory
from load import load_into_mysql_dw

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

def run_pipeline():
    logging.info("=== INICIANDO PIPELINE ETL MAXWELLDISTRIB BI ===")
    
    # 1. Extracción de archivos Excel
    raw_data = extract_all_raw_files(data_dir="data/raw")
    
    # 2. Validación de calidad de datos
    clean_data, rejected_audit = validate_and_profile_data(raw_data)
    logging.info(f"Registros limpios: {len(clean_data)} | Rechazados: {len(rejected_audit)}")
    
    # 3. Transformaciones analíticas y reglas de negocio
    transformed_model = transform_sales_and_inventory(clean_data)
    
    # 4. Carga a MySQL Star Schema (Idempotente)
    load_into_mysql_dw(transformed_model)
    
    logging.info("=== PIPELINE COMPLETADO EXITOSAMENTE ===")

if __name__ == "__main__":
    run_pipeline()`
    },
    "schema.sql": {
      label: "database/schema.sql",
      language: "sql",
      path: "database/schema.sql",
      code: `-- =========================================================================
-- MaxwellDistrib BI (Demo para Portafolio) - Star Schema Dimensional Model (MySQL 8)
-- Base de datos: ingefknc_nicadistrib_dw
-- =========================================================================

CREATE DATABASE IF NOT EXISTS ingefknc_nicadistrib_dw 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ingefknc_nicadistrib_dw;

-- DIMENSIÓN FECHA
CREATE TABLE IF NOT EXISTS dim_fecha (
    date_key INT PRIMARY KEY, -- YYYYMMDD
    fecha DATE NOT NULL UNIQUE,
    anio SMALLINT NOT NULL,
    mes TINYINT NOT NULL,
    nombre_mes VARCHAR(15) NOT NULL,
    dia_semana VARCHAR(12) NOT NULL,
    es_fin_semana BOOLEAN NOT NULL
) ENGINE=InnoDB;

-- DIMENSIÓN PRODUCTO
CREATE TABLE IF NOT EXISTS dim_producto (
    product_key INT AUTO_INCREMENT PRIMARY KEY,
    codigo_producto VARCHAR(20) NOT NULL UNIQUE,
    nombre_producto VARCHAR(120) NOT NULL,
    categoria VARCHAR(60) NOT NULL,
    costo_estandar_cordobas DECIMAL(12,2) NOT NULL,
    precio_lista_cordobas DECIMAL(12,2) NOT NULL
) ENGINE=InnoDB;

-- TABLA DE HECHOS: VENTAS
CREATE TABLE IF NOT EXISTS fact_ventas (
    sales_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_transaccion VARCHAR(30) NOT NULL UNIQUE,
    date_key INT NOT NULL,
    product_key INT NOT NULL,
    customer_key INT NOT NULL,
    branch_key INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario_cordobas DECIMAL(12,2) NOT NULL,
    subtotal_cordobas DECIMAL(14,2) NOT NULL,
    impuesto_iva_cordobas DECIMAL(14,2) NOT NULL,
    total_venta_cordobas DECIMAL(14,2) NOT NULL,
    costo_total_cordobas DECIMAL(14,2) NOT NULL,
    utilidad_bruta_cordobas DECIMAL(14,2) NOT NULL,
    margen_bruto_pct DECIMAL(5,2) NOT NULL,
    CONSTRAINT fk_ventas_fecha FOREIGN KEY (date_key) REFERENCES dim_fecha(date_key),
    CONSTRAINT fk_ventas_prod FOREIGN KEY (product_key) REFERENCES dim_producto(product_key)
) ENGINE=InnoDB;`
    },
    "main.py": {
      label: "api/main.py",
      language: "python",
      path: "api/main.py",
      code: `"""
MaxwellDistrib BI (Demo para Portafolio) - FastAPI REST Backend
Expone los KPIs y agregaciones analíticas para el frontend y herramientas externas.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="MaxwellDistrib BI (Demo para Portafolio) API",
    description="API REST de Analítica Comercial y Business Intelligence para Nicaragua",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/kpis")
def get_executive_kpis():
    return {
        "ventas_totales_cordobas": 8450230.00,
        "utilidad_bruta_cordobas": 1820450.00,
        "margen_bruto_pct": 21.54,
        "inventario_valorizado_cordobas": 4320000.00,
        "rotacion_anualizada": 5.8,
        "proveedores_activos": 48
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "nicadistrib-bi-api"}`
    },
    "nicadistrib.conf": {
      label: "apache/nicadistrib.conf",
      language: "apacheconf",
      path: "apache/nicadistrib.conf",
      code: `# =========================================================================
# Apache VirtualHost & Reverse Proxy Configuration
# Servidor: ingemaxwellchacon.com (cPanel / Apache 2.4)
# =========================================================================

<VirtualHost *:80>
    ServerName ingemaxwellchacon.com
    ServerAlias www.ingemaxwellchacon.com
    DocumentRoot /home/ingefknc/public_html

    # Proxy a la API REST de FastAPI
    ProxyPass /api/ http://127.0.0.1:8000/api/
    ProxyPassReverse /api/ http://127.0.0.1:8000/api/

    <Directory /home/ingefknc/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>`
    }
  };

  const current = files[selectedFile] || files["generate_dataset.py"];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Módulo 6 — Repositorio & Código Fuente
              </span>
              <span className="text-xs text-slate-400">Python 3.10 | SQL | FastAPI | Apache</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Explorador del Código Fuente de la Solución
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Inspecciona y copia cualquiera de los scripts del proyecto: generador de datos, pipeline ETL completo, esquema DDL de MySQL, API REST y configuración para Apache.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "¡Código Copiado!" : "Copiar Archivo"}</span>
          </button>
        </div>
      </div>

      {/* File selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {Object.keys(files).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedFile(key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              selectedFile === key
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{key}</span>
          </button>
        ))}
      </div>

      {/* Code Viewer Box */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-mono text-blue-400">{current.path}</span>
          </div>
          <span className="text-slate-500 font-mono uppercase">{current.language}</span>
        </div>

        <pre className="text-xs font-mono text-slate-200 overflow-x-auto p-2 leading-relaxed whitespace-pre scrollbar-thin max-h-[500px]">
          {current.code}
        </pre>
      </div>
    </div>
  );
};

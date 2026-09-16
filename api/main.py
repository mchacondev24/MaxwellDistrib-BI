"""
NicaDistrib BI - FastAPI REST Backend API
Expone indicadores analíticos y endpoints para el dashboard web en Angular / Apache.
Portafolio de Ing. Maxwell Chacón - Analista de Datos & BI.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import datetime

app = FastAPI(
    title="NicaDistrib BI - API REST",
    description="Backend de Inteligencia de Negocios para Distribución Comercial en Nicaragua",
    version="1.0.0"
)

# CORS para integración con Angular (localhost o Apache en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos Pydantic
class KPIResponse(BaseModel):
    ventas_totales_cordobas: float
    utilidad_bruta_cordobas: float
    margen_promedio_pct: float
    inventario_valorizado_cordobas: float
    rotacion_promedio: float
    proveedores_activos: int
    tasa_cumplimiento_entregas_pct: float
    moneda: str = "C$"
    pais: str = "Nicaragua"
    disclaimer: str = "Datos ficticios con fines demostrativos de portafolio"

@app.get("/")
def read_root():
    return {
        "sistema": "NicaDistrib BI",
        "autor": "Ing. Maxwell Chacón",
        "rol": "Analista de Datos & Business Intelligence",
        "estado": "Operativo",
        "docs": "/docs"
    }

@app.get("/api/dashboard/kpis", response_model=KPIResponse)
def get_executive_kpis():
    """Retorna los KPIs ejecutivos consolidados para la alta gerencia."""
    return KPIResponse(
        ventas_totales_cordobas=8450230.00,
        utilidad_bruta_cordobas=1820450.00,
        margen_promedio_pct=21.54,
        inventario_valorizado_cordobas=4320000.00,
        rotacion_promedio=5.8,
        proveedores_activos=48,
        tasa_cumplimiento_entregas_pct=88.4
    )

@app.get("/api/sales/monthly")
def get_monthly_sales():
    return [
        {"mes": "Enero", "ventas": 2480150, "costo": 1945000, "utilidad": 535150, "margen_pct": 21.58},
        {"mes": "Febrero", "ventas": 2810300, "costo": 2205000, "utilidad": 605300, "margen_pct": 21.54},
        {"mes": "Marzo", "ventas": 3159780, "costo": 2479780, "utilidad": 680000, "margen_pct": 21.52}
    ]

@app.get("/api/sales/departments")
def get_sales_by_department():
    return [
        {"departamento": "Managua", "ventas": 3890200, "participacion_pct": 46.04},
        {"departamento": "León", "ventas": 1540100, "participacion_pct": 18.23},
        {"departamento": "Masaya", "ventas": 1120400, "participacion_pct": 13.26},
        {"departamento": "Granada", "ventas": 780500, "participacion_pct": 9.24},
        {"departamento": "Chinandega", "ventas": 650030, "participacion_pct": 7.69},
        {"departamento": "Matagalpa", "ventas": 469000, "participacion_pct": 5.54}
    ]

@app.get("/api/suppliers/performance")
def get_supplier_performance():
    return [
        {"proveedor": "Agroindustrias del Norte", "compras": 2100000, "lead_time": 4.1, "retrasos": 2, "cumplimiento_pct": 95.2},
        {"proveedor": "Lácteos de Chontales Cía.", "compras": 1450000, "lead_time": 3.2, "retrasos": 1, "cumplimiento_pct": 97.5},
        {"proveedor": "Industrias Aceiteras Chinandega", "compras": 1820000, "lead_time": 5.4, "retrasos": 4, "cumplimiento_pct": 91.3},
        {"proveedor": "Distribuidora Nacional DINA", "compras": 1640000, "lead_time": 7.8, "retrasos": 8, "cumplimiento_pct": 82.6},
        {"proveedor": "Consorcio Químico Managua", "compras": 1440230, "lead_time": 12.1, "retrasos": 19, "cumplimiento_pct": 61.2}
    ]

@app.get("/api/dashboard/cuello-botella")
def get_bottlenecks():
    """Identifica puntos críticos de la cadena: Proveedor con demora -> Rotura de stock -> Venta perdida."""
    return {
        "resumen": "Alerta de desabastecimiento identificada en categoría Higiene y Químicos",
        "proveedor_critico": {
            "nombre": "Consorcio Químico Industrial Managua",
            "lead_time_promedio_dias": 12.1,
            "retraso_medio_dias": 5.1,
            "entregas_con_retraso_pct": 38.8
        },
        "productos_afectados": [
            {"sku": "PROD-009", "nombre": "Detergente Xedex Floral 2kg", "stock_sucursal_leon": 6, "demanda_diaria": 18, "dias_cobertura": 0.3},
            {"sku": "PROD-010", "nombre": "Jabón de Lavar Corona barra", "stock_sucursal_matagalpa": 4, "demanda_diaria": 25, "dias_cobertura": 0.16}
        ],
        "impacto_financiero_estimado": {
            "ventas_perdidas_potenciales_cordobas": 142500.00,
            "ordenes_pendientes_recepcion": 4
        }
    }

"""
NicaDistrib BI - Generador de Datasets de Ejemplo (Nicaragua)
Genera archivos Excel crudos con datos ficticios realistas y errores intencionales
para demostrar Data Quality, Validación y Limpieza en el pipeline ETL.
Portafolio de Ing. Maxwell Chacón - Analista de Datos & BI.
"""

import os
import random
from datetime import datetime, timedelta
from pathlib import Path
import pandas as pd
import numpy as np

# Configuración de carpetas
DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "raw"
DATA_DIR.mkdir(parents=True, exist_ok=True)

# Departamentos y Municipios de Nicaragua
DEPARTAMENTOS = [
    "Managua", "León", "Masaya", "Granada", "Chinandega", 
    "Matagalpa", "Estelí", "Carazo", "Rivas", "Jinotega"
]

SUCURSALES = [
    {"cod": "SUC-001", "nombre": "Sucursal Central Managua", "depto": "Managua"},
    {"cod": "SUC-002", "nombre": "Sucursal Occidente León", "depto": "León"},
    {"cod": "SUC-003", "nombre": "Sucursal Oriente Masaya", "depto": "Masaya"},
    {"cod": "SUC-004", "nombre": "Sucursal Norte Matagalpa", "depto": "Matagalpa"},
    {"cod": "SUC-005", "nombre": "Sucursal Sur Granada", "depto": "Granada"},
]

CATEGORIAS = ["Granos Básicos", "Lácteos y Derivados", "Bebidas y Jugos", "Abarrotes y Aceites", "Higiene y Limpieza"]

PRODUCTOS = [
    {"cod": "PROD-001", "nombre": "Arroz Faisán 80/20 50lb", "cat": "Granos Básicos", "costo": 850.0, "precio": 1050.0},
    {"cod": "PROD-002", "nombre": "Frijol Rojo Don Pedro 50lb", "cat": "Granos Básicos", "costo": 1400.0, "precio": 1750.0},
    {"cod": "PROD-003", "nombre": "Aceite Corona Vegetal 1L", "cat": "Abarrotes y Aceites", "costo": 58.0, "precio": 75.0},
    {"cod": "PROD-004", "nombre": "Azúcar Sulagro Blanca 50lb", "cat": "Abarrotes y Aceites", "costo": 720.0, "precio": 890.0},
    {"cod": "PROD-005", "nombre": "Leche La Perfecta Entera 1L", "cat": "Lácteos y Derivados", "costo": 34.0, "precio": 45.0},
    {"cod": "PROD-006", "nombre": "Queso Crema Chontaleño lb", "cat": "Lácteos y Derivados", "costo": 68.0, "precio": 92.0},
    {"cod": "PROD-007", "nombre": "Café Presto Instantáneo 150g", "cat": "Bebidas y Jugos", "costo": 85.0, "precio": 115.0},
    {"cod": "PROD-008", "nombre": "Jugo Del Valle Naranja 1L", "cat": "Bebidas y Jugos", "costo": 42.0, "precio": 60.0},
    {"cod": "PROD-009", "nombre": "Detergente Xedex Floral 2kg", "cat": "Higiene y Limpieza", "costo": 110.0, "precio": 148.0},
    {"cod": "PROD-010", "nombre": "Jabón de Lavar Corona barra", "cat": "Higiene y Limpieza", "costo": 18.0, "precio": 26.0},
]

PROVEEDORES = [
    {"cod": "PROV-001", "nombre": "Agroindustrias del Norte S.A.", "contacto": "Carlos Morales", "lead_time_nominal": 4},
    {"cod": "PROV-002", "nombre": "Lácteos de Chontales Cía.", "contacto": "María Solís", "lead_time_nominal": 3},
    {"cod": "PROV-003", "nombre": "Distribuidora Nacional DINA", "contacto": "Roberto Blandón", "lead_time_nominal": 7},
    {"cod": "PROV-004", "nombre": "Industrias Aceiteras de Chinandega", "contacto": "Elena Rivas", "lead_time_nominal": 5},
    {"cod": "PROV-005", "nombre": "Consorcio Químico Industrial Managua", "contacto": "Jorge Téllez", "lead_time_nominal": 12},
]

CLIENTES = [
    {"cod": "CLI-001", "nombre": "Pulpería La Bendición", "tipo": "Detallista", "depto": "Managua"},
    {"cod": "CLI-002", "nombre": "Supermercado San Jerónimo", "tipo": "Cadena Local", "depto": "Masaya"},
    {"cod": "CLI-003", "nombre": "Abarrotes El Sultán", "tipo": "Mayorista", "depto": "Granada"},
    {"cod": "CLI-004", "nombre": "Distribuidora El Carmen", "tipo": "Mayorista", "depto": "León"},
    {"cod": "CLI-005", "nombre": "Pulpería El Esfuerzo", "tipo": "Detallista", "depto": "Matagalpa"},
    {"cod": "CLI-006", "nombre": "Mini Super La Colonia Estelí", "tipo": "Cadena Local", "depto": "Estelí"},
]

VENDEDORES = [
    {"cod": "VEND-001", "nombre": "Alejandro Silva", "zona": "Pacífico Sur"},
    {"cod": "VEND-002", "nombre": "Fabiola Hernández", "zona": "Managua Metropolitana"},
    {"cod": "VEND-003", "nombre": "Marcos Montenegro", "zona": "Occidente"},
    {"cod": "VEND-004", "nombre": "Lucía Zeledón", "zona": "Norte"},
]

def generate_sales(month_name, start_date, num_rows=1500, introduce_errors=True):
    records = []
    base_dt = datetime.strptime(start_date, "%Y-%m-%d")
    
    for i in range(num_rows):
        prod = random.choice(PRODUCTOS)
        cli = random.choice(CLIENTES)
        vend = random.choice(VENDEDORES)
        suc = random.choice(SUCURSALES)
        
        days_offset = random.randint(0, 27)
        fecha = (base_dt + timedelta(days=days_offset)).strftime("%Y-%m-%d")
        cantidad = random.randint(2, 60)
        precio_unitario = prod["precio"]
        
        # Inyectar errores controlados para Data Quality y profiling didáctico
        nombre_prod = prod["nombre"]
        if introduce_errors and random.random() < 0.04:
            # Error de espacios / inconsistencia de casing
            nombre_prod = f"  {prod['nombre'].lower()}  "
        if introduce_errors and random.random() < 0.015:
            # Fecha inválida o vacía
            fecha = "2026-02-31" if random.random() < 0.5 else None
        if introduce_errors and random.random() < 0.01:
            # Cantidad negativa (posible devolución mal digitada o error)
            cantidad = -random.randint(1, 10)
        if introduce_errors and random.random() < 0.008:
            # Precio en cero
            precio_unitario = 0.0

        records.append({
            "id_transaccion": f"VT-{month_name[:3].upper()}-{1000 + i}",
            "fecha": fecha,
            "codigo_producto": prod["cod"] if random.random() > 0.005 else "PROD-999", # 0.5% prod inexistente
            "nombre_producto": nombre_prod,
            "categoria": prod["cat"],
            "codigo_cliente": cli["cod"],
            "nombre_cliente": cli["nombre"],
            "departamento": cli["depto"],
            "codigo_vendedor": vend["cod"],
            "nombre_vendedor": vend["nombre"],
            "codigo_sucursal": suc["cod"],
            "cantidad": cantidad,
            "precio_unitario_cordobas": precio_unitario,
            "costo_unitario_cordobas": prod["costo"]
        })
        
    # Inyectar duplicados exactos (15 a 30 filas duplicadas)
    if introduce_errors:
        dupes = random.sample(records, 25)
        records.extend(dupes)
        
    df = pd.DataFrame(records)
    file_path = DATA_DIR / f"ventas_{month_name}.xlsx"
    df.to_excel(file_path, index=False)
    print(f"Generado: {file_path} con {len(df)} filas.")
    return df

def generate_purchases(month_name, start_date, num_rows=400):
    records = []
    base_dt = datetime.strptime(start_date, "%Y-%m-%d")
    
    for i in range(num_rows):
        prov = random.choice(PROVEEDORES)
        prod = random.choice(PRODUCTOS)
        suc = random.choice(SUCURSALES)
        
        days_offset = random.randint(0, 27)
        fecha_orden = base_dt + timedelta(days=days_offset)
        
        # Lead time real (simulando retrasos para análisis de cuellos de botella)
        retraso_aleatorio = random.choice([0, 0, 1, 2, 4, 8, 14]) if prov["cod"] == "PROV-005" else random.choice([0, 0, 0, 1, 2])
        lead_time_real = prov["lead_time_nominal"] + retraso_aleatorio
        fecha_entrega = fecha_orden + timedelta(days=lead_time_real)
        
        cantidad = random.randint(50, 400)
        costo_unit = prod["costo"] * (1 + random.uniform(-0.03, 0.05)) # Pequeña fluctuación de precio
        
        records.append({
            "id_orden_compra": f"OC-{month_name[:3].upper()}-{2000 + i}",
            "fecha_orden": fecha_orden.strftime("%Y-%m-%d"),
            "fecha_entrega_esperada": (fecha_orden + timedelta(days=prov["lead_time_nominal"])).strftime("%Y-%m-%d"),
            "fecha_entrega_real": fecha_entrega.strftime("%Y-%m-%d"),
            "dias_lead_time": lead_time_real,
            "dias_retraso": retraso_aleatorio,
            "codigo_proveedor": prov["cod"],
            "nombre_proveedor": prov["nombre"],
            "codigo_producto": prod["cod"],
            "nombre_producto": prod["nombre"],
            "codigo_sucursal": suc["cod"],
            "cantidad_comprada": cantidad,
            "costo_unitario_cordobas": round(costo_unit, 2),
            "estado_entrega": "A Tiempo" if retraso_aleatorio == 0 else "Retrasada",
            "devoluciones": random.choice([0, 0, 0, 0, random.randint(1, 5)])
        })
        
    df = pd.DataFrame(records)
    file_path = DATA_DIR / f"compras_{month_name}.xlsx"
    df.to_excel(file_path, index=False)
    print(f"Generado: {file_path} con {len(df)} filas.")
    return df

def generate_inventory():
    records = []
    for suc in SUCURSALES:
        for prod in PRODUCTOS:
            stock_actual = random.randint(10, 350)
            stock_minimo = 40
            stock_maximo = 400
            punto_reorden = 65
            
            # Forzar algunos productos en quiebre o sobreinventario
            if prod["cod"] == "PROD-001" and suc["cod"] == "SUC-004":
                stock_actual = 8 # Quiebre / Crítico
            elif prod["cod"] == "PROD-009" and suc["cod"] == "SUC-002":
                stock_actual = 480 # Sobreinventario
                
            records.append({
                "codigo_sucursal": suc["cod"],
                "nombre_sucursal": suc["nombre"],
                "codigo_producto": prod["cod"],
                "nombre_producto": prod["nombre"],
                "categoria": prod["cat"],
                "stock_actual": stock_actual,
                "stock_minimo": stock_minimo,
                "stock_maximo": stock_maximo,
                "punto_reorden": punto_reorden,
                "costo_unitario_promedio_cordobas": prod["costo"],
                "valor_total_inventario_cordobas": stock_actual * prod["costo"],
                "ultima_fecha_movimiento": "2026-03-15"
            })
            
    df = pd.DataFrame(records)
    file_path = DATA_DIR / "inventario.xlsx"
    df.to_excel(file_path, index=False)
    print(f"Generado: {file_path} con {len(df)} filas.")
    return df

def main():
    print("Iniciando generación de Datasets para NicaDistrib BI...")
    generate_sales("enero", "2026-01-01", 1200)
    generate_sales("febrero", "2026-02-01", 1400)
    generate_sales("marzo", "2026-03-01", 1600)
    generate_purchases("enero", "2026-01-01", 350)
    generate_purchases("febrero", "2026-02-01", 380)
    generate_inventory()
    print("Todos los archivos Excel de ejemplo han sido generados exitosamente en data/raw/")

if __name__ == "__main__":
    main()

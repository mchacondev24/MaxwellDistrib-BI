# MaxwellDistrib BI (Demo para Portafolio) — Sistema de Inteligencia de Negocios para Distribución Comercial

[![Nicaragua](https://img.shields.io/badge/Pa%C3%ADs-Nicaragua-0067c6.svg)](https://es.wikipedia.org/wiki/Nicaragua)
[![Data Stack](https://img.shields.io/badge/Stack-Python_%7C_MySQL_%7C_FastAPI_%7C_PowerBI_%7C_Apache-blue.svg)](#arquitectura-del-sistema)
[![Author](https://img.shields.io/badge/Autor-Ing._Maxwell_Chac%C3%B3n-24292e.svg)](https://github.com/maxwellchacon)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Maxwell_Chac%C3%B3n-0077b5.svg)](https://www.linkedin.com/in/ingemaxwellchacon)

> ⚠️ **Aviso de Portafolio:** Todos los datos, clientes, compras, transacciones e indicadores comerciales contenidos en este proyecto son **ficticios**, diseñados con propósitos analíticos y demostrativos para evidenciar competencias profesionales en Ingeniería de Datos, Data Warehousing, Modelado Dimensional (Star Schema), Desarrollo Web y Business Intelligence.

---

## 🎯 Resumen Ejecutivo del Proyecto

**MaxwellDistrib BI (Demo para Portafolio)** es una solución integral de analítica empresarial que aborda la problemática habitual de las distribuidoras comerciales: la dispersión de datos en planillas Excel no estandarizadas, la presencia de anomalías de captura, la falta de centralización de la información y la dificultad para monitorear indicadores clave de la cadena de suministro (rotación de inventario, tiempos de entrega de proveedores y quiebres de stock).

A través de esta arquitectura se demuestra el ciclo completo de madurez analítica:
1. **Extracción y Validación (Data Quality):** Ingesta automatizada de archivos Excel con detección proactiva de inconsistencias, duplicados y rechazos auditados.
2. **Transformación & Métricas:** Normalización, cálculo de IVA (15% Nicaragua), márgenes de ganancia, rotación anualizada y días de inventario.
3. **Data Warehouse (MySQL 8):** Implementación de un modelo dimensional tipo **Star Schema** optimizado para consultas analíticas de alto desempeño.
4. **Capa API REST (FastAPI):** Exposición estructurada de KPIs y agregaciones de negocio.
5. **Dashboard Web Interactivo:** Interfaz responsiva con diseño Material Design para visualización ejecutiva y monitoreo operativo.
6. **Business Intelligence (Power BI):** Modelo analítico con biblioteca de medidas DAX, análisis de Pareto 80/20 y análisis de cuellos de botella.
7. **Despliegue Empresarial:** Configuración para publicación en servidores **Apache HTTP Server** con soporte SPA y proxy inverso.

---

## 🏗️ Arquitectura del Sistema

```
                      ARCHIVOS EXCEL (Raw)
       ┌──────────────────────┼──────────────────────┐
       ▼                      ▼                      ▼
  compras_*.xlsx        ventas_*.xlsx         inventario.xlsx
       │                      │                      │
       └──────────────────────┼──────────────────────┘
                              ▼
                       PYTHON + PANDAS
              ┌───────────────┴───────────────┐
              ▼                               ▼
       Data Quality & Profiling        Data Cleansing
              │                               │
              └───────────────┬───────────────┘
                              ▼
                       TRANSFORMACIÓN
               (Surrogates, IVA, Margen, Rotación)
                              │
                              ▼
                      MYSQL DATA WAREHOUSE
                         (Star Schema)
                   ┌──────────┴──────────┐
                   ▼                     ▼
             FASTAPI (REST)          POWER BI
                   │               (Modelo DAX)
                   ▼
            DASHBOARD WEB
          (Material Design)
                   │
                   ▼
           APACHE HTTP SERVER
```

---

## 🗄️ Modelo Dimensional (Star Schema)

El Data Warehouse implementa un esquema de estrella puro centrado en tres procesos de negocio fundamentales:

```
                     dim_fecha
                         │
                         │
dim_cliente ─────── fact_ventas ─────── dim_producto
                         │                     │
                         │                     │
                    dim_vendedor               ├─── fact_compras ─── dim_proveedor
                         │                     │
                         │                     │
                    dim_sucursal ───────── fact_inventario
```

### Tablas de Hechos (Fact Tables)
- **`fact_ventas`**: Transacciones de venta a nivel de ítem (`cantidad`, `precio_unitario`, `subtotal`, `impuesto_iva`, `costo_total`, `utilidad_bruta`, `margen_pct`).
- **`fact_compras`**: Órdenes de abastecimiento a proveedores (`cantidad_comprada`, `lead_time_real`, `dias_retraso`, `devoluciones`).
- **`fact_inventario`**: Instantánea de existencias (`stock_actual`, `valor_total_inventario`, `rotacion_anualizada`, `dias_inventario`).

### Dimensiones (Dimensions)
- `dim_fecha`, `dim_producto`, `dim_cliente`, `dim_proveedor`, `dim_sucursal`, `dim_vendedor`.

---

## 📦 Estructura del Repositorio

```text
NicaDistrib-BI/
├── README.md                          # Documentación ejecutiva del proyecto
├── package.json                       # Dependencias de la aplicación web
├── data/
│   ├── raw/                           # Datasets Excel crudos (con errores intencionales)
│   ├── processed/                     # Datasets limpios y transformados
│   └── rejected/                      # Registros rechazados con causa de auditoría
├── python/
│   ├── generate_dataset.py            # Generador de datos ficticios de Nicaragua
│   ├── extract.py                     # Módulo de extracción de Excel
│   ├── validate.py                    # Reglas de calidad y profiling
│   ├── transform.py                   # Enriquecimiento y cálculo de métricas
│   ├── load.py                        # Carga idempotente a MySQL
│   ├── etl.py                         # Orquestador del pipeline completo
│   └── requirements.txt               # Dependencias de Python
├── database/
│   └── schema.sql                     # Script DDL de tablas e índices del Data Warehouse
├── api/
│   ├── main.py                        # API REST desarrollada en FastAPI
│   └── requirements.txt               # Dependencias de la API
├── apache/
│   ├── nicadistrib.conf               # Configuración de VirtualHost y ProxyPass
│   └── .htaccess                      # Reglas de mod_rewrite para SPA en cPanel
├── docker/
│   └── docker-compose.yml             # Orquestación de MySQL, FastAPI y Apache
└── docs/                              # Guías técnicas y documentación didáctica
```

---

## 🚀 Guía de Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/maxwellchacon/NicaDistrib-BI.git
cd NicaDistrib-BI
```

### 2. Preparar el Entorno Python
```bash
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r python/requirements.txt
```

### 3. Generar Datasets y Ejecutar Pipeline ETL
```bash
# 1. Generar los archivos Excel con errores y datos de Nicaragua
python python/generate_dataset.py

# 2. Ejecutar la auditoría, limpieza, validación y consolidación
python python/etl.py
```

### 4. Configurar y Cargar MySQL
```bash
mysql -u root -p < database/schema.sql
```

### 5. Iniciar la API REST (FastAPI)
```bash
uvicorn api.main:app --reload --port 8000
# Documentación interactiva Swagger disponible en: http://localhost:8000/docs
```

### 6. Iniciar la Aplicación Web
```bash
npm install
npm run dev
# Abrir http://localhost:3000
```

---

## 🌐 Despliegue en Servidor de Producción (cPanel / Apache)

- **Servidor:** `ingemaxwellchacon.com`
- **Ruta de Publicación:** `/home/ingefknc/public_html/Portafolio/NicaDistrib-BI`
- **Configuración de Apache:** Incluye el archivo `apache/.htaccess` para resolver rutas SPA evitando errores 404 al refrescar páginas.

---

## 👤 Contacto y Créditos

**Ing. Maxwell Chacón**  
*Ingeniero de Sistemas | Analista de Datos & Business Intelligence*  
- **Correo Electrónico:** [ing.chacon.maxwell@gmail.com](mailto:ing.chacon.maxwell@gmail.com)  
- **Perfil de LinkedIn:** [linkedin.com/in/ingemaxwellchacon](https://www.linkedin.com/in/ingemaxwellchacon)  
- **Portafolio Web:** [ingemaxwellchacon.com](http://ingemaxwellchacon.com)  
- **GitHub:** [github.com/maxwellchacon](https://github.com/maxwellchacon)  

# NicaDistrib BI — Arquitectura Integral de Datos & BI

**Portafolio Profesional de Analista de Datos & Business Intelligence**  
**Autor:** Ing. Maxwell Chacón  
*Aviso: Todos los datos utilizados en este proyecto son ficticios y estructurados con fines demostrativos de portafolio y formación técnica.*

---

## 1. Visión General de la Solución

NicaDistrib BI es un sistema empresarial de inteligencia de negocios diseñado para resolver la dispersión de información, inconsistencias de calidad y demoras operativas en una compañía de distribución comercial mayorista en Nicaragua.

El sistema cubre todo el ciclo de madurez de datos:
1. **Extracción y Validación**: Tratamiento de planillas Excel departamentales con errores típicos de captura.
2. **Data Pipeline ETL**: Scripts en Python + Pandas que auditan, limpian y transforman la información.
3. **Data Warehouse (MySQL 8)**: Modelado dimensional en esquema de estrella (*Star Schema*) con tablas de hechos y dimensiones.
4. **Capa de Servicios (FastAPI)**: API REST moderna, tipada y con documentación Swagger.
5. **Dashboard Web Interactivo**: Aplicación web desarrollada con patrones Material Design, responsiva y orientada a la toma de decisiones.
6. **Capa de Analítica Avanzada (Power BI)**: Modelo semántico con medidas DAX, análisis ABC/Pareto y control de cuellos de botella.
7. **Publicación y Servidor**: Apache HTTP Server con soporte para rutas SPA y proxy inverso.

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

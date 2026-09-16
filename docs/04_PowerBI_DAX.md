# NicaDistrib BI — Biblioteca de Medidas DAX y Conexión Power BI

**Portafolio de Ing. Maxwell Chacón - Analista de Datos & BI**

---

## 1. Conexión de Power BI a MySQL

1. Abrir **Power BI Desktop**.
2. Ir a **Obtener datos** > **Base de datos MySQL**.
3. Servidor: `localhost:3306` (o IP del servidor `198.187.31.72`).
4. Base de datos: `ingefknc_nicadistrib_dw`.
5. Modo de conectividad: **Import** (recomendado para aprovechar el motor VertiPaq en memoria y optimizar consultas analíticas complejas).

---

## 2. Catálogo Maestro de Fórmulas DAX

### 1. Ventas Totales (Total Sales)
```dax
Total Ventas = SUM(fact_ventas[subtotal_cordobas])
```
* **Explicación**: Suma el valor antes de impuestos de todas las transacciones. Formato: Moneda `C$ #,##0`.

### 2. Costo Total de Ventas (COGS)
```dax
Costo Total = SUM(fact_ventas[costo_total_cordobas])
```

### 3. Utilidad Bruta (Gross Margin)
```dax
Utilidad Bruta = [Total Ventas] - [Costo Total]
```

### 4. Margen de Utilidad Bruto (%)
```dax
Margen Utilidad % = 
DIVIDE(
    [Utilidad Bruta],
    [Total Ventas],
    0
)
```
* **Explicación**: Utiliza la función `DIVIDE` para prevenir errores de división por cero (`#DIV/0!`). Formato: Porcentaje `0.00%`.

### 5. Inventario Valorizado (Current Stock Value)
```dax
Inventario Valorizado = SUM(fact_inventario[valor_total_inventario_cordobas])
```

### 6. Rotación de Inventario (Inventory Turnover)
```dax
Rotacion Inventario = 
DIVIDE(
    [Costo Total],
    [Inventario Valorizado],
    0
)
```
* **Interpretación de Negocio**: Indica cuántas veces el inventario se convierte en ventas durante el ciclo analizado. Un valor de `5.8x` representa un ciclo saludable en consumo masivo.

### 7. Días de Inventario (Days on Hand)
```dax
Dias Inventario = 
DIVIDE(
    365,
    [Rotacion Inventario],
    999
)
```

### 8. Ventas del Mes Anterior (MOM - Month over Month)
```dax
Ventas Mes Anterior = 
CALCULATE(
    [Total Ventas],
    DATEADD(dim_fecha[fecha], -1, MONTH)
)
```

### 9. Crecimiento de Ventas Mensual (%)
```dax
Crecimiento Mensual % = 
DIVIDE(
    [Total Ventas] - [Ventas Mes Anterior],
    [Ventas Mes Anterior],
    0
)
```

### 10. Tasa de Cumplimiento de Proveedores (OTIF - On Time Delivery)
```dax
Tasa Cumplimiento Proveedores % = 
DIVIDE(
    CALCULATE(COUNTROWS(fact_compras), fact_compras[dias_retraso] = 0),
    COUNTROWS(fact_compras),
    0
)
```

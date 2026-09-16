import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

const DATA_RAW = path.resolve('data/raw');
const DATA_PROCESSED = path.resolve('data/processed');

if (!fs.existsSync(DATA_RAW)) fs.mkdirSync(DATA_RAW, { recursive: true });
if (!fs.existsSync(DATA_PROCESSED)) fs.mkdirSync(DATA_PROCESSED, { recursive: true });

const DEPARTAMENTOS = ["Managua", "León", "Masaya", "Granada", "Chinandega", "Matagalpa", "Estelí", "Carazo", "Rivas", "Jinotega"];

const PRODUCTOS = [
  { cod: "PROD-001", nombre: "Arroz Faisán 80/20 50lb", cat: "Granos Básicos", costo: 850.0, precio: 1050.0 },
  { cod: "PROD-002", nombre: "Frijol Rojo Don Pedro 50lb", cat: "Granos Básicos", costo: 1400.0, precio: 1750.0 },
  { cod: "PROD-003", nombre: "Aceite Corona Vegetal 1L", cat: "Abarrotes y Aceites", costo: 58.0, precio: 75.0 },
  { cod: "PROD-004", nombre: "Azúcar Sulagro Blanca 50lb", cat: "Abarrotes y Aceites", costo: 720.0, precio: 890.0 },
  { cod: "PROD-005", nombre: "Leche La Perfecta Entera 1L", cat: "Lácteos y Derivados", costo: 34.0, precio: 45.0 },
  { cod: "PROD-006", nombre: "Queso Crema Chontaleño lb", cat: "Lácteos y Derivados", costo: 68.0, precio: 92.0 },
  { cod: "PROD-007", nombre: "Café Presto Instantáneo 150g", cat: "Bebidas y Jugos", costo: 85.0, precio: 115.0 },
  { cod: "PROD-008", nombre: "Jugo Del Valle Naranja 1L", cat: "Bebidas y Jugos", costo: 42.0, precio: 60.0 },
  { cod: "PROD-009", nombre: "Detergente Xedex Floral 2kg", cat: "Higiene y Limpieza", costo: 110.0, precio: 148.0 },
  { cod: "PROD-010", nombre: "Jabón de Lavar Corona barra", cat: "Higiene y Limpieza", costo: 18.0, precio: 26.0 }
];

const CLIENTES = [
  { cod: "CLI-001", nombre: "Pulpería La Bendición", depto: "Managua" },
  { cod: "CLI-002", nombre: "Supermercado San Jerónimo", depto: "Masaya" },
  { cod: "CLI-003", nombre: "Abarrotes El Sultán", depto: "Granada" },
  { cod: "CLI-004", nombre: "Distribuidora El Carmen", depto: "León" },
  { cod: "CLI-005", nombre: "Pulpería El Esfuerzo", depto: "Matagalpa" },
  { cod: "CLI-006", nombre: "Mini Super La Colonia Estelí", depto: "Estelí" }
];

const VENDEDORES = [
  { cod: "VEND-001", nombre: "Alejandro Silva", zona: "Pacífico Sur" },
  { cod: "VEND-002", nombre: "Fabiola Hernández", zona: "Managua" },
  { cod: "VEND-003", nombre: "Marcos Montenegro", zona: "Occidente" },
  { cod: "VEND-004", nombre: "Lucía Zeledón", zona: "Norte" }
];

const SUCURSALES = [
  { cod: "SUC-001", nombre: "Sucursal Central Managua", depto: "Managua" },
  { cod: "SUC-002", nombre: "Sucursal Occidente León", depto: "León" },
  { cod: "SUC-003", nombre: "Sucursal Oriente Masaya", depto: "Masaya" },
  { cod: "SUC-004", nombre: "Sucursal Norte Matagalpa", depto: "Matagalpa" },
  { cod: "SUC-005", nombre: "Sucursal Sur Granada", depto: "Granada" }
];

const PROVEEDORES = [
  { cod: "PROV-001", nombre: "Agroindustrias del Norte S.A.", lead: 4 },
  { cod: "PROV-002", nombre: "Lácteos de Chontales Cía.", lead: 3 },
  { cod: "PROV-003", nombre: "Distribuidora Nacional DINA", lead: 7 },
  { cod: "PROV-004", nombre: "Industrias Aceiteras de Chinandega", lead: 5 },
  { cod: "PROV-005", nombre: "Consorcio Químico Industrial Managua", lead: 12 }
];

function generateSales(month, year, count, withErrors = true) {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const prod = PRODUCTOS[Math.floor(Math.random() * PRODUCTOS.length)];
    const cli = CLIENTES[Math.floor(Math.random() * CLIENTES.length)];
    const vend = VENDEDORES[Math.floor(Math.random() * VENDEDORES.length)];
    const suc = SUCURSALES[Math.floor(Math.random() * SUCURSALES.length)];
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    let fecha = `${year}-${String(month).padStart(2, '0')}-${day}`;
    let cant = Math.floor(Math.random() * 45) + 2;
    let precio = prod.precio;
    let prodName = prod.nombre;

    // Errores intencionales
    if (withErrors && Math.random() < 0.03) prodName = `   ${prod.nombre.toLowerCase()}   `;
    if (withErrors && Math.random() < 0.01) fecha = "2026-02-31"; // fecha invalida
    if (withErrors && Math.random() < 0.01) cant = -5; // cantidad negativa
    if (withErrors && Math.random() < 0.008) precio = 0; // precio cero

    rows.push({
      "ID Transacción": `VT-${year}${String(month).padStart(2, '0')}-${1000 + i}`,
      "Fecha": fecha,
      "Código Producto": prod.cod,
      "Nombre Producto": prodName,
      "Categoría": prod.cat,
      "Código Cliente": cli.cod,
      "Nombre Cliente": cli.nombre,
      "Departamento": cli.depto,
      "Código Vendedor": vend.cod,
      "Nombre Vendedor": vend.nombre,
      "Código Sucursal": suc.cod,
      "Cantidad": cant,
      "Precio Unitario (C$)": precio,
      "Costo Unitario (C$)": prod.costo
    });
  }

  // Duplicados intencionales
  if (withErrors) {
    for (let d = 0; d < 12; d++) {
      rows.push({ ...rows[d] });
    }
  }

  return rows;
}

function generatePurchases(month, year, count) {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const prov = PROVEEDORES[Math.floor(Math.random() * PROVEEDORES.length)];
    const prod = PRODUCTOS[Math.floor(Math.random() * PRODUCTOS.length)];
    const suc = SUCURSALES[Math.floor(Math.random() * SUCURSALES.length)];
    const day = Math.floor(Math.random() * 25) + 1;
    const fechaOrden = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const delay = prov.cod === "PROV-005" ? (Math.random() < 0.5 ? Math.floor(Math.random() * 8) + 3 : 0) : (Math.random() < 0.2 ? Math.floor(Math.random() * 3) + 1 : 0);
    const realLead = prov.lead + delay;
    const cant = Math.floor(Math.random() * 250) + 40;

    rows.push({
      "ID Orden Compra": `OC-${year}${String(month).padStart(2, '0')}-${2000 + i}`,
      "Fecha Orden": fechaOrden,
      "Código Proveedor": prov.cod,
      "Nombre Proveedor": prov.nombre,
      "Código Producto": prod.cod,
      "Nombre Producto": prod.nombre,
      "Código Sucursal": suc.cod,
      "Cantidad Comprada": cant,
      "Costo Unitario (C$)": prod.costo,
      "Lead Time Nominal (Días)": prov.lead,
      "Días Retraso": delay,
      "Lead Time Real (Días)": realLead,
      "Estado Entrega": delay === 0 ? "A Tiempo" : "Retrasada",
      "Devoluciones": Math.random() < 0.08 ? Math.floor(Math.random() * 4) + 1 : 0
    });
  }
  return rows;
}

function generateInventory() {
  const rows = [];
  SUCURSALES.forEach(suc => {
    PRODUCTOS.forEach(prod => {
      let stock = Math.floor(Math.random() * 260) + 15;
      if (prod.cod === "PROD-001" && suc.cod === "SUC-004") stock = 6; // Stock critico
      if (prod.cod === "PROD-009" && suc.cod === "SUC-002") stock = 420; // Sobreinventario

      rows.push({
        "Código Sucursal": suc.cod,
        "Nombre Sucursal": suc.nombre,
        "Código Producto": prod.cod,
        "Nombre Producto": prod.nombre,
        "Categoría": prod.cat,
        "Stock Actual": stock,
        "Stock Mínimo": 35,
        "Stock Máximo": 350,
        "Punto de Reorden": 55,
        "Costo Unitario (C$)": prod.costo,
        "Valor Total Inventario (C$)": stock * prod.costo,
        "Último Movimiento": "2026-03-15"
      });
    });
  });
  return rows;
}

function writeExcel(filePath, data, sheetName = "Datos") {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filePath);
  console.log(`Excel generado: ${filePath} (${data.length} filas)`);
}

// 1. Raw sales with intentional errors
writeExcel(path.join(DATA_RAW, "ventas_enero.xlsx"), generateSales(1, 2026, 850, true), "Ventas_Enero");
writeExcel(path.join(DATA_RAW, "ventas_febrero.xlsx"), generateSales(2, 2026, 920, true), "Ventas_Febrero");
writeExcel(path.join(DATA_RAW, "ventas_marzo.xlsx"), generateSales(3, 2026, 1100, true), "Ventas_Marzo");

// 2. Raw purchases & inventory
writeExcel(path.join(DATA_RAW, "compras_enero.xlsx"), generatePurchases(1, 2026, 220), "Compras_Enero");
writeExcel(path.join(DATA_RAW, "compras_febrero.xlsx"), generatePurchases(2, 2026, 250), "Compras_Febrero");
writeExcel(path.join(DATA_RAW, "inventario.xlsx"), generateInventory(), "Inventario");

// 3. Processed Clean Master for Power BI and Analytics
const cleanSalesEnero = generateSales(1, 2026, 800, false);
const cleanSalesFeb = generateSales(2, 2026, 880, false);
const cleanSalesMarzo = generateSales(3, 2026, 1050, false);
const allCleanSales = [...cleanSalesEnero, ...cleanSalesFeb, ...cleanSalesMarzo].map(r => {
  const subtotal = r["Cantidad"] * r["Precio Unitario (C$)"];
  const iva = subtotal * 0.15;
  const total = subtotal + iva;
  const costoTotal = r["Cantidad"] * r["Costo Unitario (C$)"];
  const utilidad = subtotal - costoTotal;
  const margen = subtotal > 0 ? (utilidad / subtotal) * 100 : 0;
  return {
    ...r,
    "Subtotal (C$)": subtotal,
    "IVA 15% (C$)": iva,
    "Total Venta (C$)": total,
    "Costo Total (C$)": costoTotal,
    "Utilidad Bruta (C$)": utilidad,
    "Margen Bruto %": parseFloat(margen.toFixed(2))
  };
});

writeExcel(path.join(DATA_PROCESSED, "ventas_limpias.xlsx"), allCleanSales, "Fact_Ventas_Clean");
writeExcel(path.join(DATA_PROCESSED, "dataset_powerbi.xlsx"), allCleanSales, "Ventas_PowerBI");

console.log("Generación completada exitosamente!");

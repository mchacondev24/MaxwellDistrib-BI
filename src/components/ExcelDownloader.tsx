import React, { useState } from 'react';
import { Download, FileSpreadsheet, Check, ArrowRight, ShieldAlert, Sparkles, FolderDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { PRODUCTOS_DATA, PROVEEDORES_DATA, DEPARTAMENTOS_NICARAGUA } from '../data/nicaraguaData';

export const ExcelDownloader: React.FC = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const generateSalesWorkbook = (withErrors: boolean) => {
    const rows = [];
    const months = [1, 2, 3];
    let counter = 1;

    for (const m of months) {
      for (let i = 0; i < 200; i++) {
        const prod = PRODUCTOS_DATA[Math.floor(Math.random() * PRODUCTOS_DATA.length)];
        const depto = DEPARTAMENTOS_NICARAGUA[Math.floor(Math.random() * DEPARTAMENTOS_NICARAGUA.length)];
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        let fecha = `2026-${String(m).padStart(2, '0')}-${day}`;
        let cant = Math.floor(Math.random() * 30) + 2;
        let precio = prod.precio;
        let prodName = prod.nombre;

        if (withErrors) {
          if (Math.random() < 0.03) prodName = `   ${prod.nombre.toLowerCase()}   `;
          if (Math.random() < 0.015) fecha = "2026-02-31"; // Invalida
          if (Math.random() < 0.01) cant = -4; // Negativa
          if (Math.random() < 0.008) precio = 0; // Cero
        }

        const subtotal = cant * precio;
        const iva = subtotal * 0.15;
        const total = subtotal + iva;
        const costoTotal = cant * prod.costo;
        const utilidad = subtotal - costoTotal;

        const record: any = {
          "ID Transacción": `VT-2026${String(m).padStart(2, '0')}-${1000 + counter++}`,
          "Fecha": fecha,
          "Código Producto": prod.cod,
          "Nombre Producto": prodName,
          "Categoría": prod.cat,
          "Departamento": depto.departamento,
          "Cantidad": cant,
          "Precio Unitario (C$)": precio,
          "Costo Unitario (C$)": prod.costo
        };

        if (!withErrors) {
          record["Subtotal (C$)"] = subtotal;
          record["IVA 15% (C$)"] = iva;
          record["Total Venta (C$)"] = total;
          record["Costo Total (C$)"] = costoTotal;
          record["Utilidad Bruta (C$)"] = utilidad;
          record["Margen %"] = subtotal > 0 ? Number(((utilidad / subtotal) * 100).toFixed(2)) : 0;
        }

        rows.push(record);
      }
    }
    return rows;
  };

  const generatePurchasesWorkbook = () => {
    const rows = [];
    for (let i = 1; i <= 250; i++) {
      const prov = PROVEEDORES_DATA[Math.floor(Math.random() * PROVEEDORES_DATA.length)];
      const prod = PRODUCTOS_DATA[Math.floor(Math.random() * PRODUCTOS_DATA.length)];
      const delay = prov.diasRetraso > 2 ? Math.floor(Math.random() * 8) + 2 : 0;
      const realLead = prov.leadTimeNominal + delay;
      const cant = Math.floor(Math.random() * 150) + 30;

      rows.push({
        "ID Orden Compra": `OC-2026-${2000 + i}`,
        "Fecha Orden": `2026-02-${String(Math.floor(Math.random() * 25) + 1).padStart(2, '0')}`,
        "Código Proveedor": prov.cod,
        "Nombre Proveedor": prov.nombre,
        "Código Producto": prod.cod,
        "Nombre Producto": prod.nombre,
        "Cantidad Comprada": cant,
        "Costo Unitario (C$)": prod.costo,
        "Lead Time Nominal (Días)": prov.leadTimeNominal,
        "Días de Retraso": delay,
        "Lead Time Real (Días)": realLead,
        "Estado Entrega": delay === 0 ? "A Tiempo" : "Retrasada",
        "Unidades Devueltas": Math.random() < 0.1 ? Math.floor(Math.random() * 4) + 1 : 0
      });
    }
    return rows;
  };

  const generateInventoryWorkbook = () => {
    return PRODUCTOS_DATA.map(p => ({
      "Código SKU": p.cod,
      "Nombre Producto": p.nombre,
      "Categoría": p.cat,
      "Stock Actual": p.stock,
      "Stock Mínimo": p.stockMin,
      "Stock Máximo": p.stockMax,
      "Punto de Reorden": p.reorden,
      "Costo Promedio (C$)": p.costo,
      "Valor Inventario (C$)": p.stock * p.costo,
      "Rotación Calculada": p.rotacion,
      "Días de Inventario": p.diasInv,
      "Velocidad Rotación": p.categoriaVelocidad,
      "Clasificación ABC": p.abc
    }));
  };

  const downloadFile = (filename: string, data: any[], sheetName: string) => {
    setDownloading(filename);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename);
    setTimeout(() => setDownloading(null), 1200);
  };

  const downloadAllZip = async () => {
    setDownloading("zip");
    const zip = new JSZip();

    const addSheetToZip = (data: any[], sheetName: string, filename: string) => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      zip.file(filename, wbout);
    };

    addSheetToZip(generateSalesWorkbook(true), "Ventas_Raw", "data/raw/ventas_crudo.xlsx");
    addSheetToZip(generatePurchasesWorkbook(), "Compras_Raw", "data/raw/compras_crudo.xlsx");
    addSheetToZip(generateInventoryWorkbook(), "Inventario", "data/raw/inventario.xlsx");
    addSheetToZip(generateSalesWorkbook(false), "Ventas_Clean", "data/processed/ventas_limpias.xlsx");
    addSheetToZip(generateSalesWorkbook(false), "PowerBI_Dataset", "data/processed/dataset_powerbi.xlsx");

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MaxwellDistrib_BI_Datasets_Excel.zip";
    a.click();
    URL.revokeObjectURL(url);
    setDownloading(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Datasets Reproducibles en Formato Excel (.xlsx)
              </span>
              <span className="text-xs text-slate-400">Contexto Comercial de Nicaragua</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Generador y Descargador de Datasets
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Descarga los archivos Excel crudos para poner a prueba tus propios scripts de Python/Pandas o el dataset limpio listo para importar directamente en Microsoft Power BI.
            </p>
          </div>

          <button
            onClick={downloadAllZip}
            disabled={downloading !== null}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
          >
            <FolderDown className="w-4 h-4" />
            <span>{downloading === "zip" ? "Comprimiendo ZIP..." : "Descargar Todo en ZIP (.zip)"}</span>
          </button>
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Ventas Crudo */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Con Errores Intencionales
              </span>
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">ventas_crudo.xlsx</h3>
            <p className="text-xs text-slate-300 mb-4">
              600 transacciones con errores de digitación, espacios redundantes, fechas no bisiestas inválidas y cantidades negativas para practicar Data Quality.
            </p>
          </div>
          <button
            onClick={() => downloadFile("ventas_crudo.xlsx", generateSalesWorkbook(true), "Ventas_Raw")}
            disabled={downloading !== null}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Ventas Crudas</span>
          </button>
        </div>

        {/* Card 2: Compras Crudo */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Lead Times & Retrasos
              </span>
              <FileSpreadsheet className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">compras_crudo.xlsx</h3>
            <p className="text-xs text-slate-300 mb-4">
              250 órdenes de abastecimiento a proveedores con fechas de orden, tiempos de entrega y demoras para análisis de cuellos de botella.
            </p>
          </div>
          <button
            onClick={() => downloadFile("compras_crudo.xlsx", generatePurchasesWorkbook(), "Compras_Raw")}
            disabled={downloading !== null}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Compras Crudas</span>
          </button>
        </div>

        {/* Card 3: Inventario */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Stock & Rotación
              </span>
              <FileSpreadsheet className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">inventario.xlsx</h3>
            <p className="text-xs text-slate-300 mb-4">
              Instantánea de existencias en sucursales departamentales con clasificación ABC, rotación, stock mínimo y puntos de reorden.
            </p>
          </div>
          <button
            onClick={() => downloadFile("inventario.xlsx", generateInventoryWorkbook(), "Inventario")}
            disabled={downloading !== null}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Inventario</span>
          </button>
        </div>

        {/* Card 4: Ventas Limpias */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Post-Transformación ETL
              </span>
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">ventas_limpias.xlsx</h3>
            <p className="text-xs text-slate-300 mb-4">
              Ventas depuradas por el script de transformación, con cálculos de Subtotal, IVA (15%), Utilidad Bruta y Margen %.
            </p>
          </div>
          <button
            onClick={() => downloadFile("ventas_limpias.xlsx", generateSalesWorkbook(false), "Ventas_Clean")}
            disabled={downloading !== null}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Ventas Limpias</span>
          </button>
        </div>

        {/* Card 5: Power BI Dataset */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between md:col-span-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-semibold">
                Para Microsoft Power BI
              </span>
              <FileSpreadsheet className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">dataset_powerbi.xlsx</h3>
            <p className="text-xs text-slate-300 mb-4">
              Archivo maestro listo para importar en Power BI Desktop o publicar en el servicio de Power BI. Contiene las tablas de hechos y dimensiones listas para vincular con las fórmulas DAX documentadas.
            </p>
          </div>
          <button
            onClick={() => downloadFile("dataset_powerbi.xlsx", generateSalesWorkbook(false), "Dataset_PowerBI")}
            disabled={downloading !== null}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-yellow-600 hover:bg-yellow-500 text-slate-950 font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Dataset para Power BI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

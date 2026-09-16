import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RefreshCw, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  FileSpreadsheet, 
  Database, 
  Filter,
  Check,
  ShieldCheck,
  Zap
} from 'lucide-react';
import * as XLSX from 'xlsx';

interface RejectedRow {
  id: string;
  fecha: string;
  producto: string;
  cantidad: number;
  precio: number;
  archivo: string;
  error: string;
}

const SAMPLE_REJECTED: RejectedRow[] = [
  { id: "VT-202601-1042", fecha: "2026-02-31", producto: "Arroz Faisán 80/20 50lb", cantidad: 15, precio: 1050, archivo: "ventas_enero.xlsx", error: "Fecha inválida (2026-02-31 no existe)" },
  { id: "VT-202601-1008", fecha: "2026-01-14", producto: "Frijol Don Pedro 50lb", cantidad: 20, precio: 1750, archivo: "ventas_enero.xlsx", error: "Registro duplicado en id_transaccion" },
  { id: "VT-202602-1215", fecha: "2026-02-18", producto: "Aceite Corona Vegetal 1L", cantidad: -5, precio: 75, archivo: "ventas_febrero.xlsx", error: "Cantidad negativa (-5 uds no permitidas)" },
  { id: "VT-202602-1340", fecha: "2026-02-22", producto: "PROD-999 Inexistente", cantidad: 10, precio: 450, archivo: "ventas_febrero.xlsx", error: "Código de producto no existe en dim_producto" },
  { id: "VT-202603-1490", fecha: "2026-03-05", producto: "Azúcar Sulagro Blanca", cantidad: 8, precio: 0, archivo: "ventas_marzo.xlsx", error: "Precio unitario igual a cero" },
  { id: "VT-202603-1512", fecha: "   ", producto: "Leche La Perfecta Entera", cantidad: 30, precio: 45, archivo: "ventas_marzo.xlsx", error: "Fecha vacía o nula" },
  { id: "VT-202603-1620", fecha: "2026-03-18", producto: "Detergente Xedex Floral", cantidad: -12, precio: 148, archivo: "ventas_marzo.xlsx", error: "Cantidad menor a cero (devolución sin nota de crédito)" }
];

export const EtlSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(4);
  const [logs, setLogs] = useState<string[]>([
    "[08:30:00] INFO: Pipeline ETL MaxwellDistrib BI (Demo para Portafolio) inicializado.",
    "[08:30:01] EXTRACT: Encontrados 3 archivos de ventas (ventas_enero.xlsx, ventas_febrero.xlsx, ventas_marzo.xlsx).",
    "[08:30:02] EXTRACT: Encontrados compras_enero.xlsx, compras_febrero.xlsx e inventario.xlsx.",
    "[08:30:03] DATA QUALITY: Ejecutando validación de 2,906 filas crudas.",
    "[08:30:04] WARNING: Detectadas 24 filas con anomalías (duplicados, fechas inválidas, precios en cero).",
    "[08:30:05] TRANSFORM: Normalizando nombres, calculando métricas IVA (15%), utilidad bruta y márgenes.",
    "[08:30:06] TRANSFORM: Calculando rotación de inventario y días de cobertura por sucursal.",
    "[08:30:07] LOAD: Cargando dimensiones (dim_fecha, dim_cliente, dim_producto, dim_sucursal, dim_proveedor).",
    "[08:30:08] LOAD: Cargando hechos fact_ventas (2,882 filas limpias) con surrogate keys.",
    "[08:30:09] SUCCESS: Carga a MySQL Data Warehouse exitosa. Idempotencia verificada."
  ]);

  const handleRunETL = () => {
    setIsRunning(true);
    setLogs([]);
    setActiveStep(1);

    const logSequence = [
      { step: 1, text: `[${new Date().toLocaleTimeString()}] INFO: Iniciando Pipeline ETL Python + Pandas...` },
      { step: 1, text: `[${new Date().toLocaleTimeString()}] EXTRACT: Leyendo data/raw/ventas_enero.xlsx (862 filas)...` },
      { step: 1, text: `[${new Date().toLocaleTimeString()}] EXTRACT: Leyendo data/raw/ventas_febrero.xlsx (932 filas)...` },
      { step: 1, text: `[${new Date().toLocaleTimeString()}] EXTRACT: Leyendo data/raw/ventas_marzo.xlsx (1,112 filas)...` },
      { step: 2, text: `[${new Date().toLocaleTimeString()}] VALIDATE: Aplicando 5 reglas de Data Quality...` },
      { step: 2, text: `[${new Date().toLocaleTimeString()}] WARNING: 7 fechas inválidas detectadas y segregadas a data/rejected/` },
      { step: 2, text: `[${new Date().toLocaleTimeString()}] WARNING: 12 filas duplicadas por id_transaccion eliminadas.` },
      { step: 2, text: `[${new Date().toLocaleTimeString()}] WARNING: 5 cantidades negativas descartadas.` },
      { step: 3, text: `[${new Date().toLocaleTimeString()}] TRANSFORM: Normalizando espacios y casing de strings.` },
      { step: 3, text: `[${new Date().toLocaleTimeString()}] TRANSFORM: Calculando subtotal_cordobas, impuesto_iva (15%), utilidad y margen %.` },
      { step: 3, text: `[${new Date().toLocaleTimeString()}] TRANSFORM: Generando date_key dimensional (YYYYMMDD).` },
      { step: 4, text: `[${new Date().toLocaleTimeString()}] LOAD: Conectando a MySQL ingefknc_nicadistrib_dw vía SQLAlchemy...` },
      { step: 4, text: `[${new Date().toLocaleTimeString()}] LOAD: 2,882 filas insertadas en fact_ventas con ON DUPLICATE KEY UPDATE.` },
      { step: 4, text: `[${new Date().toLocaleTimeString()}] SUCCESS: Pipeline completado en 1.84 segundos. Tasa de calidad: 99.17%` }
    ];

    let currentLogIndex = 0;
    const timer = setInterval(() => {
      if (currentLogIndex < logSequence.length) {
        const item = logSequence[currentLogIndex];
        setLogs(prev => [...prev, item.text]);
        setActiveStep(item.step);
        currentLogIndex++;
      } else {
        clearInterval(timer);
        setIsRunning(false);
      }
    }, 280);
  };

  const handleDownloadRejectedExcel = () => {
    const ws = XLSX.utils.json_to_sheet(SAMPLE_REJECTED);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rechazados_Audit");
    XLSX.writeFile(wb, "ventas_rechazadas_data_quality.xlsx");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Módulo 2 — Python + Pandas ETL Pipeline
              </span>
              <span className="text-xs text-slate-400">Data Engineering & Data Quality</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Simulador Interactivo del Pipeline ETL
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Observa en tiempo real cómo el pipeline en Python toma múltiples archivos Excel crudos, audita y perfila anomalías, aplica reglas de limpieza y valida la carga al Data Warehouse en MySQL.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunETL}
              disabled={isRunning}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? "Ejecutando ETL..." : "Ejecutar Pipeline ETL"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pipeline Stages Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Step 1: EXTRACT */}
        <div className={`p-4 rounded-xl border transition-all ${
          activeStep >= 1 ? 'bg-slate-800 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold text-blue-400 mb-1">
            <span>PASO 1: EXTRACT</span>
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <p className="text-sm font-bold text-white mb-1">Lectura de Múltiples Excel</p>
          <p className="text-xs text-slate-300">
            Globbing dinámico con <code className="text-blue-300 font-mono">pd.read_excel()</code>. Traza <strong>2,906 filas</strong> de origen.
          </p>
        </div>

        {/* Step 2: VALIDATE */}
        <div className={`p-4 rounded-xl border transition-all ${
          activeStep >= 2 ? 'bg-slate-800 border-amber-500 shadow-md shadow-amber-500/10' : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-1">
            <span>PASO 2: VALIDATE</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-sm font-bold text-white mb-1">Data Quality & Auditoría</p>
          <p className="text-xs text-slate-300">
            Detecta duplicados, fechas erróneas y cantidades negativas. <strong>24 rechazados</strong>.
          </p>
        </div>

        {/* Step 3: TRANSFORM */}
        <div className={`p-4 rounded-xl border transition-all ${
          activeStep >= 3 ? 'bg-slate-800 border-purple-500 shadow-md shadow-purple-500/10' : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold text-purple-400 mb-1">
            <span>PASO 3: TRANSFORM</span>
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-sm font-bold text-white mb-1">Cálculo de Métricas BI</p>
          <p className="text-xs text-slate-300">
            Limpieza de strings, cálculo de IVA (15%), utilidad bruta, márgenes y claves subrogadas.
          </p>
        </div>

        {/* Step 4: LOAD */}
        <div className={`p-4 rounded-xl border transition-all ${
          activeStep >= 4 ? 'bg-slate-800 border-emerald-500 shadow-md shadow-emerald-500/10' : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-1">
            <span>PASO 4: LOAD</span>
            <Database className="w-4 h-4" />
          </div>
          <p className="text-sm font-bold text-white mb-1">Carga MySQL Star Schema</p>
          <p className="text-xs text-slate-300">
            Carga idempotente mediante SQLAlchemy y <code className="text-emerald-300 font-mono">ON DUPLICATE KEY</code>.
          </p>
        </div>
      </div>

      {/* Terminal Log Output */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl font-mono text-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-semibold">Consola de Ejecución ETL (python/etl.py)</span>
          </div>
          <span className="text-[11px] text-slate-500">Python 3.10 | Pandas | SQLAlchemy</span>
        </div>

        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
          {logs.map((log, idx) => (
            <div 
              key={idx}
              className={`leading-relaxed ${
                log.includes('ERROR') ? 'text-rose-400' :
                log.includes('WARNING') ? 'text-amber-300' :
                log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' :
                'text-slate-300'
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Rows Table for Data Quality demonstration */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white">
                Auditoría de Registros Rechazados por Data Quality
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Registros extraídos que infringieron las reglas de negocio y fueron dirigidos a data/rejected/
            </p>
          </div>

          <button
            onClick={handleDownloadRejectedExcel}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Descargar Rechazos (.xlsx)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="py-2.5 px-3">ID Transacción</th>
                <th className="py-2.5 px-3">Archivo Origen</th>
                <th className="py-2.5 px-3">Fecha Capturada</th>
                <th className="py-2.5 px-3">Producto</th>
                <th className="py-2.5 px-3">Cantidad</th>
                <th className="py-2.5 px-3">Precio</th>
                <th className="py-2.5 px-3">Causa del Rechazo (Regla infringida)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {SAMPLE_REJECTED.map((row) => (
                <tr key={row.id} className="hover:bg-slate-700/30">
                  <td className="py-2.5 px-3 font-mono font-medium text-white">{row.id}</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.archivo}</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">{row.fecha || '<NULO>'}</td>
                  <td className="py-2.5 px-3">{row.producto}</td>
                  <td className={`py-2.5 px-3 font-mono ${row.cantidad < 0 ? 'text-rose-400 font-bold' : ''}`}>
                    {row.cantidad}
                  </td>
                  <td className="py-2.5 px-3 font-mono">C$ {row.precio}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]">
                      {row.error}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

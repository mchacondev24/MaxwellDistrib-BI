import React, { useState } from 'react';
import { Database, Key, HelpCircle, Layers, ArrowRight, Table, ShieldCheck, Check } from 'lucide-react';

export const StarSchemaViewer: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>("fact_ventas");

  const entities: Record<string, {
    title: string;
    type: 'Hecho' | 'Dimensión';
    grain: string;
    keys: string[];
    measures?: string[];
    attributes?: string[];
    description: string;
  }> = {
    fact_ventas: {
      title: "fact_ventas",
      type: "Hecho",
      grain: "Una fila por cada línea o ítem vendido en una factura comercial.",
      keys: ["sales_id (PK)", "date_key (FK)", "product_key (FK)", "customer_key (FK)", "employee_key (FK)", "branch_key (FK)"],
      measures: ["cantidad", "precio_unitario_cordobas", "subtotal_cordobas", "impuesto_iva_cordobas", "total_venta_cordobas", "costo_total_cordobas", "utilidad_bruta_cordobas", "margen_bruto_pct"],
      description: "Contiene las métricas numéricas agregables fundamentales para evaluar ingresos, rentabilidad y volumen transaccional de la distribuidora."
    },
    fact_compras: {
      title: "fact_compras",
      type: "Hecho",
      grain: "Una fila por cada orden de compra o recepción de producto desde proveedor.",
      keys: ["purchase_id (PK)", "date_key (FK)", "supplier_key (FK)", "product_key (FK)", "branch_key (FK)"],
      measures: ["cantidad_comprada", "costo_unitario_cordobas", "total_compra_cordobas", "lead_time_real_dias", "dias_retraso", "unidades_devueltas"],
      description: "Monitorea la eficiencia en el reabastecimiento, nivel de servicio de proveedores y demoras en días en la cadena de suministros."
    },
    fact_inventario: {
      title: "fact_inventario",
      type: "Hecho",
      grain: "Instantánea periódica (snapshot) del saldo de existencias por producto y sucursal.",
      keys: ["inventory_id (PK)", "date_key (FK)", "branch_key (FK)", "product_key (FK)"],
      measures: ["stock_actual", "stock_minimo", "stock_maximo", "punto_reorden", "valor_total_inventario_cordobas", "rotacion_anualizada", "dias_inventario"],
      description: "Almacena los niveles de inventario valorizado, rotación y alertas de desabastecimiento de cada centro de distribución."
    },
    dim_producto: {
      title: "dim_producto",
      type: "Dimensión",
      grain: "Un registro por cada SKU o artículo comercial comercializado.",
      keys: ["product_key (Surrogate PK)", "codigo_producto (Business Key)"],
      attributes: ["nombre_producto", "categoria", "costo_estandar_cordobas", "precio_lista_cordobas"],
      description: "Catálogo maestro de artículos para filtrar por categorías (Granos Básicos, Lácteos, Bebidas, Abarrotes, Limpieza)."
    },
    dim_cliente: {
      title: "dim_cliente",
      type: "Dimensión",
      grain: "Un registro por cada detallista, pulpería o mayorista cliente.",
      keys: ["customer_key (Surrogate PK)", "codigo_cliente (Business Key)"],
      attributes: ["nombre_cliente", "tipo_cliente (Detallista, Cadena, Mayorista)", "departamento (Managua, León, etc.)"],
      description: "Segmentación geográfica y tipología comercial de los compradores a nivel nacional."
    },
    dim_fecha: {
      title: "dim_fecha",
      type: "Dimensión",
      grain: "Un registro por cada día calendario continuo (2025-2030).",
      keys: ["date_key (PK formato YYYYMMDD)"],
      attributes: ["fecha", "anio", "mes", "nombre_mes", "trimestre", "dia_semana", "es_fin_semana"],
      description: "Habilita análisis temporales, comparativas mes anterior (MoM), año anterior (YoY) y estacionalidad de demanda."
    },
    dim_proveedor: {
      title: "dim_proveedor",
      type: "Dimensión",
      grain: "Un registro por cada empresa fabricante o proveedora de insumos.",
      keys: ["supplier_key (Surrogate PK)", "codigo_proveedor (Business Key)"],
      attributes: ["nombre_proveedor", "contacto", "lead_time_nominal_dias"],
      description: "Permite comparar los tiempos de entrega acordados contractualmente contra el desempeño real."
    }
  };

  const activeData = entities[selectedEntity] || entities["fact_ventas"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Módulo 3 — Data Warehouse & Modelado Dimensional
              </span>
              <span className="text-xs text-slate-400">Esquema en Estrella (Star Schema)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Arquitectura del Modelo Dimensional (MySQL 8)
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Diseño tipo Star Schema optimizado para Business Intelligence. Separa hechos cuantitativos (ventas, compras, inventario) de dimensiones descriptivas de contexto (tiempo, clientes, productos, proveedores).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Entity Selector & Architecture Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Diagram Entity Buttons */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md space-y-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              Tablas del Data Warehouse
            </h2>
            <p className="text-xs text-slate-400 mb-3">
              Haz clic en cualquier tabla para inspeccionar su granularidad, claves y columnas:
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Tablas de Hechos (Facts)</span>
            {['fact_ventas', 'fact_compras', 'fact_inventario'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedEntity(t)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  selectedEntity === t
                    ? 'bg-blue-600/30 border-blue-500 text-white font-semibold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  <span className="font-mono text-xs">{t}</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Fact
                </span>
              </button>
            ))}

            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Dimensiones (Dimensions)</span>
            </div>
            {['dim_fecha', 'dim_producto', 'dim_cliente', 'dim_proveedor'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedEntity(t)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  selectedEntity === t
                    ? 'bg-emerald-600/30 border-emerald-500 text-white font-semibold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs">{t}</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Dim
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Columns: Deep Dive into Selected Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                  activeData.type === 'Hecho' 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {activeData.type} Table
                </span>
                <h3 className="text-xl font-bold text-white font-mono">{activeData.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4">{activeData.description}</p>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 mb-4 text-xs">
              <span className="font-semibold text-white">Granularidad (Grano): </span>
              <span className="text-slate-300">{activeData.grain}</span>
            </div>

            {/* Keys */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Claves y Relaciones</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeData.keys.map((k, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Measures or Attributes */}
            {activeData.measures && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-blue-400" />
                  <span>Métricas y Medidas Cuantitativas</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {activeData.measures.map((m, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] font-mono text-blue-300">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeData.attributes && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Atributos Descriptivos</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeData.attributes.map((a, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] font-mono text-emerald-300">
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Incluye índices compuestos en MySQL para optimizar agregaciones analíticas de Power BI en milisegundos.
            </span>
          </div>
        </div>
      </div>

      {/* Conceptual Explanation: Why Star Schema & Surrogate Keys */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            ¿Por qué no conectar Power BI a Excel directo?
          </h4>
          <p className="text-slate-300">
            Conectar directamente genera modelos lentos, inconsistencias por errores no corregidos y problemas al escalar miles de transacciones. Centralizar en MySQL tras el ETL asegura <strong>una única fuente de la verdad (SSOT)</strong> y auditoría comprobable.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            Surrogate Keys vs Business Keys
          </h4>
          <p className="text-slate-300">
            El <strong>Business Key</strong> (ej. <code className="text-slate-200">PROD-001</code>) proviene del sistema de ventas. La <strong>Surrogate Key</strong> (entero auto-incremental ej. <code className="text-slate-200">product_key = 1</code>) aísla el Data Warehouse de cambios en los sistemas operacionales y acelera los joins hasta un 400%.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Ventaja del Star Schema
          </h4>
          <p className="text-slate-300">
            A diferencia de la normalización 3NF que requiere múltiples joins en cadena, el esquema en estrella tiene una distancia máxima de un salto hacia cualquier dimensión, facilitando el motor DAX y reduciendo drásticamente la complejidad de las consultas.
          </p>
        </div>
      </div>
    </div>
  );
};

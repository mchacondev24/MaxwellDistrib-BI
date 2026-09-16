import React, { useState } from 'react';
import { Copy, Check, BarChart2, BookOpen, Code, Database, HelpCircle, Layers } from 'lucide-react';

interface DaxMeasure {
  name: string;
  category: 'Financiera' | 'Inventario' | 'Proveedores' | 'Tiempo';
  formula: string;
  description: string;
  businessLogic: string;
}

const DAX_MEASURES: DaxMeasure[] = [
  {
    name: "Total Ventas",
    category: "Financiera",
    formula: "Total Ventas = SUM(fact_ventas[subtotal_cordobas])",
    description: "Suma del monto facturado en Córdobas antes de IVA.",
    businessLogic: "Métrica base del modelo. Utiliza el subtotal para medir el volumen genuino de negocio sin distorsión impositiva."
  },
  {
    name: "Costo Total",
    category: "Financiera",
    formula: "Costo Total = SUM(fact_ventas[costo_total_cordobas])",
    description: "Costo de adquisición de las mercancías vendidas (COGS).",
    businessLogic: "Calculado a partir de la multiplicación de cantidad vendida por el costo unitario de compra registrado en la transacción."
  },
  {
    name: "Utilidad Bruta",
    category: "Financiera",
    formula: "Utilidad Bruta = [Total Ventas] - [Costo Total]",
    description: "Ganancia bruta total generada por las ventas comerciales.",
    businessLogic: "Margen de contribución monetario para cubrir costos fijos y gastos de distribución."
  },
  {
    name: "Margen Utilidad %",
    category: "Financiera",
    formula: "Margen Utilidad % = \nDIVIDE(\n    [Utilidad Bruta],\n    [Total Ventas],\n    0\n)",
    description: "Porcentaje de ganancia bruta sobre los ingresos netos.",
    businessLogic: "La función DIVIDE previene errores de división por cero (#DIV/0!) en periodos o categorías sin facturación."
  },
  {
    name: "Inventario Valorizado",
    category: "Inventario",
    formula: "Inventario Valorizado = SUM(fact_inventario[valor_total_inventario_cordobas])",
    description: "Capital de trabajo inmovilizado en existencias de bodega.",
    businessLogic: "Permite evaluar la liquidez y exposición financiera del stock en cada una de las sucursales del país."
  },
  {
    name: "Rotación de Inventario",
    category: "Inventario",
    formula: "Rotacion Inventario = \nDIVIDE(\n    [Costo Total],\n    [Inventario Valorizado],\n    0\n)",
    description: "Número de ciclos que el inventario rota durante el periodo analizado.",
    businessLogic: "Una rotación de 5.8x indica un recambio de existencias cada ~63 días. Clave para evitar mermas en lácteos y granos."
  },
  {
    name: "Días de Inventario (DIO)",
    category: "Inventario",
    formula: "Dias Inventario = \nDIVIDE(\n    365,\n    [Rotacion Inventario],\n    999\n)",
    description: "Días promedio que un producto permanece almacenado antes de venderse.",
    businessLogic: "Alinea la política de compras: productos clase A deben mantenerse bajo 45 días para maximizar flujo de caja."
  },
  {
    name: "Ventas Mes Anterior (MoM)",
    category: "Tiempo",
    formula: "Ventas Mes Anterior = \nCALCULATE(\n    [Total Ventas],\n    DATEADD(dim_fecha[fecha], -1, MONTH)\n)",
    description: "Facturación equivalente del mes calendario precedente.",
    businessLogic: "Utiliza Time Intelligence de DAX conectando la dimensión dim_fecha continua."
  },
  {
    name: "Crecimiento Mensual %",
    category: "Tiempo",
    formula: "Crecimiento Mensual % = \nDIVIDE(\n    [Total Ventas] - [Ventas Mes Anterior],\n    [Ventas Mes Anterior],\n    0\n)",
    description: "Tasa porcentual de aceleración o contracción en ventas.",
    businessLogic: "Muestra el dinamismo comercial mensual entre regiones de Nicaragua."
  },
  {
    name: "Tasa Cumplimiento Proveedores %",
    category: "Proveedores",
    formula: "Tasa Cumplimiento Proveedores % = \nDIVIDE(\n    CALCULATE(COUNTROWS(fact_compras), fact_compras[dias_retraso] = 0),\n    COUNTROWS(fact_compras),\n    0\n)",
    description: "Porcentaje de pedidos recibidos sin demoras (On-Time Delivery).",
    businessLogic: "Fundamental para calificar el nivel de servicio y activar alertas de riesgo en la cadena de suministros."
  }
];

export const PowerBiDaxCatalog: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Todas");

  const categories = ["Todas", "Financiera", "Inventario", "Tiempo", "Proveedores"];

  const filtered = activeCategory === "Todas" 
    ? DAX_MEASURES 
    : DAX_MEASURES.filter(m => m.category === activeCategory);

  const handleCopy = (formula: string, idx: number) => {
    navigator.clipboard.writeText(formula);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-950/30 via-slate-900 to-slate-900 border border-yellow-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                Módulos 7 & 8 — Microsoft Power BI & Fórmulas DAX
              </span>
              <span className="text-xs text-slate-400">Modelo Semántico y Medidas Calculadas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Biblioteca de Medidas DAX para Power BI
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Catálogo estandarizado de medidas DAX listas para copiar y pegar en Power BI Desktop, conectadas al Star Schema de MySQL para evaluar rentabilidad, inventario y rendimiento de proveedores.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-yellow-500 text-slate-950 font-bold shadow-sm shadow-yellow-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DAX Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((m, idx) => (
          <div key={m.name} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-yellow-400 bg-yellow-500/10 px-2.5 py-0.5 rounded border border-yellow-500/20">
                  {m.category}
                </span>
                <button
                  onClick={() => handleCopy(m.formula, idx)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
                  title="Copiar fórmula DAX"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === idx ? "¡Copiada!" : "Copiar DAX"}</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{m.name}</h3>
              <p className="text-xs text-slate-300 mb-3">{m.description}</p>

              {/* Code block */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-yellow-300 overflow-x-auto whitespace-pre-wrap mb-3">
                {m.formula}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Justificación de Negocio: </span>
              {m.businessLogic}
            </div>
          </div>
        ))}
      </div>

      {/* Power Query M vs Python Comparison Card */}
      <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-yellow-400" />
          <span>Transformación en Python (ETL) vs Power Query M: ¿Cuándo utilizar cada uno?</span>
        </h3>
        <p className="text-xs text-slate-300 mb-4">
          Una pregunta común en entrevistas para roles de Analista de Datos y BI:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <h4 className="font-bold text-blue-400 mb-2">Cuándo utilizar Python + Pandas (Backend ETL)</h4>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Limpieza y validación antes de ingresar a la base de datos empresarial.</li>
              <li>Generación de reportes de auditoría y segregación de filas rechazadas (<code className="text-slate-200">data/rejected/</code>).</li>
              <li>Orquestación masiva y tareas programadas en servidores (CRON / Airflow).</li>
              <li>Carga idempotente a MySQL con claves subrogadas.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <h4 className="font-bold text-yellow-400 mb-2">Cuándo utilizar Power Query M (BI Engine)</h4>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Transformaciones cosméticas en la capa de presentación (nombres de visuales, orden de columnas).</li>
              <li>Creación de columnas de ordenamiento personalizado (ej. ordenar meses cronológicamente por mes_num).</li>
              <li>Query Folding para delegar filtros pesados directamente al motor MySQL.</li>
              <li>Ad-hoc prototyping para usuarios finales no programadores.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

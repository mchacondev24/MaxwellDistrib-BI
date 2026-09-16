import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Package, 
  RefreshCw, 
  Truck, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Layers,
  MapPin
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { 
  MONTHLY_SALES, 
  DEPARTAMENTOS_NICARAGUA, 
  CATEGORY_SALES, 
  PARETO_DATA, 
  PRODUCTOS_DATA 
} from '../data/nicaraguaData';

const COLORS = ['#2563eb', '#38bdf8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const ExecutiveDashboard: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner / Portfolio Scope Notice */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Página 1 — Executive Overview
              </span>
              <span className="text-xs text-slate-400">Distribución Comercial en Nicaragua</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tablero de Control Ejecutivo BI
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Consolidación multidimensional de operaciones comerciales a partir de datos procesados por el pipeline ETL en Python, centralizados en MySQL y modelados para Business Intelligence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('etl')}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Ver Pipeline ETL
            </button>
            <button
              onClick={() => onNavigate('cuellos')}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Cuellos de Botella
            </button>
          </div>
        </div>
      </div>

      {/* 6 Core Executive KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* KPI 1: Ventas */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-sm hover:border-blue-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Ventas Totales</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            C$ 8,450,230
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>+12.4% vs mes anterior</span>
          </div>
        </div>

        {/* KPI 2: Utilidad */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-sm hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Utilidad Bruta</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            C$ 1,820,450
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-slate-400">
            <span>Costo: C$ 6.63M</span>
          </div>
        </div>

        {/* KPI 3: Margen */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-sm hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Margen Bruto</span>
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            21.54%
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-sky-400">
            <span>Objetivo meta: 20.0%</span>
          </div>
        </div>

        {/* KPI 4: Inventario */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Inventario</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            C$ 4,320,000
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-slate-400">
            <span>1,441 unidades activas</span>
          </div>
        </div>

        {/* KPI 5: Rotación */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-sm hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Rotación</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            5.8x
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-slate-400">
            <span>62.9 días promedio</span>
          </div>
        </div>

        {/* KPI 6: Proveedores */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-sm hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Proveedores</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            48 Activos
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-amber-400">
            <span>88.4% On-Time</span>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Ventas y Utilidad Mensual */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div>
              <h2 className="text-base font-bold text-white">Evolución de Ventas vs Costos y Utilidad (C$)</h2>
              <p className="text-xs text-slate-400">Tendencia mensual consolidada a través de fact_ventas</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Ventas
              </span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" /> Costo
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Utilidad
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_SALES} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="mes" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickFormatter={(v) => `C$${(v/1000000).toFixed(1)}M`} 
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value: any) => [`C$ ${Number(value).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="ventas" fill="#2563eb" name="Ventas Totales" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costo" fill="#475569" name="Costo de Ventas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="utilidad" fill="#10b981" name="Utilidad Bruta" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Participación por Categoría */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white mb-1">Ventas por Categoría</h2>
            <p className="text-xs text-slate-400 mb-4">Concentración del portafolio en productos básicos</p>
            
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_SALES}
                    dataKey="ventas"
                    nameKey="categoria"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {CATEGORY_SALES.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`C$ ${Number(value).toLocaleString()}`, 'Ventas']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-3 pt-3 border-t border-slate-700/60">
            {CATEGORY_SALES.map((item, idx) => (
              <div key={item.categoria} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-slate-300 truncate max-w-[130px]">{item.categoria}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{item.share}%</span>
                  <span className="font-semibold text-white">C$ {(item.ventas/1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Departments & Pareto 80/20 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Sales */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <h2 className="text-base font-bold text-white">Ventas por Departamento (Nicaragua)</h2>
              </div>
              <p className="text-xs text-slate-400">Distribución geográfica y ticket promedio por zona</p>
            </div>
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
              6 Departamentos
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={DEPARTAMENTOS_NICARAGUA}
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis 
                  type="number" 
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickFormatter={(v) => `C$${(v/1000000).toFixed(1)}M`}
                />
                <YAxis dataKey="departamento" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  formatter={(value: any) => [`C$ ${Number(value).toLocaleString()}`, 'Ventas']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="ventas" fill="#38bdf8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pareto 80/20 Analysis */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-bold text-white">Análisis de Pareto (80/20) de Productos</h2>
              </div>
              <p className="text-xs text-slate-400">El 40% de productos genera el 74.8% de las ventas totales</p>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Clase A: 5 SKUs
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PARETO_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="producto" stroke="#94a3b8" fontSize={10} angle={-25} textAnchor="end" height={50} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  formatter={(v: any) => [`${v}%`, 'Contribución Acumulada']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="acumPct" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  dot={{ fill: '#10b981', r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Automated Analytical Insights Section */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Insights Automáticos de Negocio
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Crecimiento Sostenido
            </div>
            <p className="text-slate-300">
              Las ventas del trimestre crecieron un <strong>12.4%</strong> en Febrero y <strong>12.4%</strong> en Marzo, impulsadas por la demanda de Granos Básicos en Managua y León.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              Concentración Geográfica
            </div>
            <p className="text-slate-300">
              <strong>Managua</strong> lidera el 46.0% de los ingresos con un ticket promedio de <strong>C$ 8,645</strong>, seguido por la región de Occidente (León con 18.2%).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Riesgo en Cadena de Suministro
            </div>
            <p className="text-slate-300">
              El proveedor <strong>Consorcio Químico Industrial Managua</strong> presenta un lead time de 17.1 días (5.1 días de demora), provocando riesgo de stockout en Detergente y Jabón.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

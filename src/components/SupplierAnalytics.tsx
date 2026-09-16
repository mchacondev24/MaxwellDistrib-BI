import React from 'react';
import { Truck, Clock, AlertTriangle, CheckCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { PROVEEDORES_DATA } from '../data/nicaraguaData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const SupplierAnalytics: React.FC = () => {
  const chartData = PROVEEDORES_DATA.map(p => ({
    nombre: p.nombre.split(' ')[0] + ' ' + (p.nombre.split(' ')[1] || ''),
    nominal: p.leadTimeNominal,
    real: p.leadTimeReal,
    retraso: p.diasRetraso
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Página 4 — Gestión de Proveedores & Compras
          </span>
          <span className="text-xs text-slate-400">Evaluación de Nivel de Servicio (SLA)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Scorecard de Proveedores & Tiempos de Entrega
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Monitoreo del desempeño de compras, cumplimiento de plazos de entrega pactados (Lead Time Nominal vs Real) y tasas de devolución por defectos de fábrica.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Proveedores Activos</span>
          <div className="text-2xl font-bold text-white mt-1">48 Empresas</div>
          <span className="text-xs text-indigo-400 font-medium">Nicaragua & Centroamérica</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Lead Time Promedio Ponderado</span>
          <div className="text-2xl font-bold text-white mt-1">6.8 días</div>
          <span className="text-xs text-slate-400">Pactado: 5.2 días</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Entregas a Tiempo (OTIF)</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">88.4%</div>
          <span className="text-xs text-emerald-400">Cumplimiento global</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Tasa de Devoluciones</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">1.24%</div>
          <span className="text-xs text-slate-400">Por empaque dañado</span>
        </div>
      </div>

      {/* Chart: Nominal vs Real Lead Time */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <h2 className="text-base font-bold text-white mb-1">
          Comparativa de Lead Time Nominal vs Real (Días)
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          La brecha entre las barras refleja el retraso operacional promedio introducido por cada proveedor
        </p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="nombre" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} unit=" d" />
              <Tooltip 
                formatter={(v: any, name: any) => [`${v} días`, name === 'nominal' ? 'Lead Time Pactado' : 'Lead Time Real']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend />
              <Bar dataKey="nominal" fill="#64748b" name="Lead Time Nominal (Pactado)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="real" fill="#6366f1" name="Lead Time Real" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scorecard Table */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <h3 className="text-base font-bold text-white mb-3">Scorecard Detallado de Proveedores</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="py-2.5 px-3">Código</th>
                <th className="py-2.5 px-3">Razón Social</th>
                <th className="py-2.5 px-3">Contacto Comercial</th>
                <th className="py-2.5 px-3">Lead Time Nominal</th>
                <th className="py-2.5 px-3">Lead Time Real</th>
                <th className="py-2.5 px-3">Cumplimiento %</th>
                <th className="py-2.5 px-3">Tasa Devolución</th>
                <th className="py-2.5 px-3">Calificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {PROVEEDORES_DATA.map((p) => (
                <tr key={p.cod} className="hover:bg-slate-700/30">
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-200">{p.cod}</td>
                  <td className="py-2.5 px-3 font-medium text-white">{p.nombre}</td>
                  <td className="py-2.5 px-3 text-slate-400">{p.contacto}</td>
                  <td className="py-2.5 px-3">{p.leadTimeNominal} días</td>
                  <td className="py-2.5 px-3 font-bold text-white">{p.leadTimeReal} días</td>
                  <td className="py-2.5 px-3">
                    <span className={`font-bold ${p.cumplimientoPct >= 90 ? 'text-emerald-400' : p.cumplimientoPct >= 75 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {p.cumplimientoPct}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{p.tasaDevolucionPct}%</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.estado === 'Óptimo' ? 'bg-emerald-500/20 text-emerald-300' :
                      p.estado === 'Aceptable' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-rose-500/20 text-rose-300'
                    }`}>
                      {p.estado}
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

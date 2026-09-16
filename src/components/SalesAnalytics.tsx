import React, { useState } from 'react';
import { MapPin, TrendingUp, Users, DollarSign, ShoppingCart, Award } from 'lucide-react';
import { DEPARTAMENTOS_NICARAGUA, MONTHLY_SALES, CATEGORY_SALES } from '../data/nicaraguaData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const SalesAnalytics: React.FC = () => {
  const [selectedDepto, setSelectedDepto] = useState<string>("Managua");

  const deptoData = DEPARTAMENTOS_NICARAGUA.find(d => d.departamento === selectedDepto) || DEPARTAMENTOS_NICARAGUA[0];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
            Página 2 — Análisis Regional & Ventas
          </span>
          <span className="text-xs text-slate-400">Territorio Nacional de Nicaragua</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Rendimiento Comercial por Departamentos
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Análisis de facturación, cobertura territorial, tickets promedio y comportamiento de compra en los principales centros urbanos y departamentales del país.
        </p>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Ventas Managua (Líder)</span>
          <div className="text-2xl font-bold text-white mt-1">C$ 3,890,200</div>
          <span className="text-xs text-sky-400 font-medium">46.04% del volumen nacional</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Ventas Occidente (León)</span>
          <div className="text-2xl font-bold text-white mt-1">C$ 1,540,100</div>
          <span className="text-xs text-emerald-400 font-medium">18.23% del volumen nacional</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Ticket Promedio Nacional</span>
          <div className="text-2xl font-bold text-white mt-1">C$ 7,540</div>
          <span className="text-xs text-slate-400">Por factura a detallistas</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Puntos de Venta Atendidos</span>
          <div className="text-2xl font-bold text-white mt-1">1,090 Clientes</div>
          <span className="text-xs text-purple-400">Pulperías y Supermercados</span>
        </div>
      </div>

      {/* Interactive Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <h2 className="text-base font-bold text-white mb-1">
            Comparativa de Ventas y Participación Departamental
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Haz clic en cualquier departamento para ver su ticket promedio y cartera de clientes
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPARTAMENTOS_NICARAGUA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="departamento" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `C$${(v/1000000).toFixed(1)}M`} />
                <Tooltip 
                  formatter={(v: any) => [`C$ ${Number(v).toLocaleString()}`, 'Ventas Totales']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="ventas" 
                  fill="#38bdf8" 
                  radius={[4, 4, 0, 0]} 
                  onClick={(entry: any) => {
                    if (entry && entry.departamento) {
                      setSelectedDepto(entry.departamento);
                    }
                  }}
                  cursor="pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Selected Department Card */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Departamento Seleccionado</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-1">{deptoData.departamento}</h3>
            <p className="text-xs text-slate-400 mb-4">Métricas comerciales consolidadas</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-slate-400 mb-0.5">Ventas Totales Facturadas</div>
                <div className="text-xl font-bold text-white">
                  C$ {deptoData.ventas.toLocaleString()}
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-slate-400 mb-0.5">Participación sobre el Total País</div>
                <div className="text-xl font-bold text-sky-400">
                  {deptoData.participacion}%
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-slate-400 mb-0.5">Puntos de Venta (Clientes)</div>
                <div className="text-xl font-bold text-emerald-400">
                  {deptoData.clientes} clientes
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-slate-400 mb-0.5">Ticket Promedio por Pedido</div>
                <div className="text-xl font-bold text-amber-400">
                  C$ {deptoData.ticketPromedio.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs text-slate-400">
            Frecuencia de visita: 2 veces por semana por ruta logística.
          </div>
        </div>
      </div>
    </div>
  );
};

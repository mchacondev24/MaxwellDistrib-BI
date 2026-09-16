import React, { useState } from 'react';
import { Package, RefreshCw, AlertTriangle, CheckCircle, Search, Filter, HelpCircle, Layers } from 'lucide-react';
import { PRODUCTOS_DATA } from '../data/nicaraguaData';

export const InventoryAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("TODAS");
  const [filterVelocity, setFilterVelocity] = useState("TODAS");

  const categories = ["TODAS", "Granos Básicos", "Abarrotes y Aceites", "Lácteos y Derivados", "Bebidas y Jugos", "Higiene y Limpieza"];
  const velocities = ["TODAS", "ALTA ROTACIÓN", "MEDIA ROTACIÓN", "BAJA ROTACIÓN", "SIN MOVIMIENTO"];

  const filteredProducts = PRODUCTOS_DATA.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.cod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === "TODAS" || p.cat === filterCategory;
    const matchesVel = filterVelocity === "TODAS" || p.categoriaVelocidad === filterVelocity;
    return matchesSearch && matchesCat && matchesVel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Página 3 — Gestión de Inventario & Rotación
          </span>
          <span className="text-xs text-slate-400">Eficiencia en Capital de Trabajo</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Rotación, Stock Crítico y Clasificación ABC
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Control de existencias valorizadas, cálculo de rotación anualizada, estimación de días de cobertura e identificación temprana de productos bajo punto de reorden.
        </p>
      </div>

      {/* Inventory KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Inventario Total</span>
          <div className="text-xl sm:text-2xl font-bold text-white mt-1">1,441 uds</div>
          <span className="text-xs text-slate-400">En 5 sucursales</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Valor Inventario</span>
          <div className="text-xl sm:text-2xl font-bold text-white mt-1">C$ 4.32M</div>
          <span className="text-xs text-emerald-400 font-medium">Costo promedio</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Rotación Promedio</span>
          <div className="text-xl sm:text-2xl font-bold text-purple-400 mt-1">5.8x</div>
          <span className="text-xs text-slate-400">Ciclos anualizados</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Días Cobertura</span>
          <div className="text-xl sm:text-2xl font-bold text-white mt-1">62.9 d</div>
          <span className="text-xs text-slate-400">365 / Rotación</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Stock Crítico</span>
          <div className="text-xl sm:text-2xl font-bold text-amber-400 mt-1">2 SKUs</div>
          <span className="text-xs text-amber-400">Bajo punto reorden</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-medium">Productos Agotados</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">0 SKUs</div>
          <span className="text-xs text-emerald-400">100% disponibilidad</span>
        </div>
      </div>

      {/* Formula Explanation Card */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>Fórmulas Analíticas Utilizadas en el Pipeline & DAX</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-purple-400 font-bold block mb-1">Rotación de Inventario</span>
            <div className="font-mono bg-slate-950 p-2 rounded text-slate-200 mb-1">
              Rotación = Costo de Ventas / Inventario Promedio
            </div>
            <p className="text-slate-400 text-[11px]">
              Evalúa cuántas veces se renuevan las existencias en el almacén durante el año.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-sky-400 font-bold block mb-1">Días de Inventario (DIO)</span>
            <div className="font-mono bg-slate-950 p-2 rounded text-slate-200 mb-1">
              Días de Inventario = 365 / Rotación
            </div>
            <p className="text-slate-400 text-[11px]">
              Expresa el tiempo en días que tarda la mercadería en transformarse en dinero efectivo.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">Punto de Reorden (ROP)</span>
            <div className="font-mono bg-slate-950 p-2 rounded text-slate-200 mb-1">
              ROP = (Demanda Diaria × Lead Time) + Stock Seguridad
            </div>
            <p className="text-slate-400 text-[11px]">
              Nivel de existencias que dispara automáticamente la emisión de una nueva orden de compra.
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Table with Filters */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar producto o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={filterVelocity}
              onChange={(e) => setFilterVelocity(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              {velocities.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Producto</th>
                <th className="py-2.5 px-3">Categoría</th>
                <th className="py-2.5 px-3">Stock Actual</th>
                <th className="py-2.5 px-3">Punto Reorden</th>
                <th className="py-2.5 px-3">Valor Total (C$)</th>
                <th className="py-2.5 px-3">Rotación</th>
                <th className="py-2.5 px-3">Días Inv.</th>
                <th className="py-2.5 px-3">Velocidad</th>
                <th className="py-2.5 px-3">ABC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((p) => {
                const isCritical = p.stock <= p.reorden;
                return (
                  <tr key={p.cod} className="hover:bg-slate-700/40">
                    <td className="py-2.5 px-3 font-mono font-medium text-slate-200">{p.cod}</td>
                    <td className="py-2.5 px-3 font-medium text-white">{p.nombre}</td>
                    <td className="py-2.5 px-3 text-slate-400">{p.cat}</td>
                    <td className={`py-2.5 px-3 font-mono font-bold ${isCritical ? 'text-amber-400' : 'text-white'}`}>
                      {p.stock} uds {isCritical && '⚠️'}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{p.reorden} uds</td>
                    <td className="py-2.5 px-3 font-mono">C$ {(p.stock * p.costo).toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-mono text-purple-300">{p.rotacion}x</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{p.diasInv} d</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        p.categoriaVelocidad === 'ALTA ROTACIÓN' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        p.categoriaVelocidad === 'MEDIA ROTACIÓN' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {p.categoriaVelocidad}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.abc === 'A' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        p.abc === 'B' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        'bg-slate-700 text-slate-400'
                      }`}>
                        Clase {p.abc}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

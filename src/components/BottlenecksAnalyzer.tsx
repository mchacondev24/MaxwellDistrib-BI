import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  TrendingDown, 
  Truck, 
  PackageX, 
  CheckCircle2, 
  DollarSign,
  AlertCircle,
  HelpCircle,
  Play
} from 'lucide-react';
import { PROVEEDORES_DATA } from '../data/nicaraguaData';

export const BottlenecksAnalyzer: React.FC = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("PROV-005");
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationStep, setSimulationStep] = useState(3);

  const supplier = PROVEEDORES_DATA.find(p => p.cod === selectedSupplier) || PROVEEDORES_DATA[4];

  const runSimulation = () => {
    setSimulationRunning(true);
    setSimulationStep(0);
    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setSimulationRunning(false);
          return 4;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Página 5 — Cuellos de Botella & Supply Chain
              </span>
              <span className="text-xs text-slate-400">Detección y Causalidad Operativa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Análisis de Cuellos de Botella en la Cadena de Suministro
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Conecta de forma directa Compras + Inventario + Ventas. Permite rastrear cómo el retraso de un proveedor impacta el nivel de stock en bodega, genera quiebres de inventario y ocasiona ventas perdidas en Córdobas (C$).
            </p>
          </div>

          <button
            onClick={runSimulation}
            disabled={simulationRunning}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/25 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {simulationRunning ? "Simulando Flujo..." : "Ejecutar Simulación de Cadena"}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Flow Diagram */}
      <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <h2 className="text-base font-bold text-white mb-2">
          Flujo Causal: De la Orden de Compra al Impacto en Ventas
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Paso a paso del retraso detectado en el producto Detergente Xedex Floral 2kg (PROD-009)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Step 1: Orden de Compra */}
          <div className={`p-4 rounded-xl border transition-all ${
            simulationStep >= 0 
              ? 'bg-blue-950/40 border-blue-600 shadow-md shadow-blue-500/10' 
              : 'bg-slate-900/60 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs text-blue-400 mb-2 font-semibold">
              <span>1. Generación OC</span>
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-sm font-bold text-white mb-1">Stock Bajo Detectado</p>
            <p className="text-xs text-slate-300">
              Sucursal León alcanza el punto de reorden (55 unidades). Se emite OC-MAR-2041 por 200 uds.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 font-mono bg-slate-950/60 p-1.5 rounded">
              Fecha: 2026-03-01
            </div>
          </div>

          {/* Step 2: Despacho Proveedor */}
          <div className={`p-4 rounded-xl border transition-all ${
            simulationStep >= 1 
              ? 'bg-amber-950/40 border-amber-600 shadow-md shadow-amber-500/10' 
              : 'bg-slate-900/60 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs text-amber-400 mb-2 font-semibold">
              <span>2. Demora Proveedor</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-sm font-bold text-white mb-1">Lead Time Prolongado</p>
            <p className="text-xs text-slate-300">
              Lead time pactado: 12 días. Tiempo real: <strong>17.1 días</strong> (+5.1 días de retraso).
            </p>
            <div className="mt-3 text-[11px] text-amber-300 font-mono bg-slate-950/60 p-1.5 rounded">
              Retraso: +5.1 Días
            </div>
          </div>

          {/* Step 3: Agotamiento Stock */}
          <div className={`p-4 rounded-xl border transition-all ${
            simulationStep >= 2 
              ? 'bg-rose-950/40 border-rose-600 shadow-md shadow-rose-500/10' 
              : 'bg-slate-900/60 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs text-rose-400 mb-2 font-semibold">
              <span>3. Quiebre de Stock</span>
              <PackageX className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-sm font-bold text-white mb-1">Stockout en Sucursal</p>
            <p className="text-xs text-slate-300">
              El inventario de seguridad se agota en el día 13. Quedan <strong>0 unidades</strong> disponibles.
            </p>
            <div className="mt-3 text-[11px] text-rose-300 font-mono bg-slate-950/60 p-1.5 rounded">
              Stock actual: 0 uds
            </div>
          </div>

          {/* Step 4: Demanda Insatisfecha */}
          <div className={`p-4 rounded-xl border transition-all ${
            simulationStep >= 3 
              ? 'bg-purple-950/40 border-purple-600 shadow-md shadow-purple-500/10' 
              : 'bg-slate-900/60 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs text-purple-400 mb-2 font-semibold">
              <span>4. Clientes Afectados</span>
              <AlertCircle className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-sm font-bold text-white mb-1">Demanda no Servida</p>
            <p className="text-xs text-slate-300">
              4 detallistas clave de León no pudieron ser abastecidos durante 4 días hábiles.
            </p>
            <div className="mt-3 text-[11px] text-purple-300 font-mono bg-slate-950/60 p-1.5 rounded">
              Demanda: 18 uds/día
            </div>
          </div>

          {/* Step 5: Venta Perdida */}
          <div className={`p-4 rounded-xl border transition-all ${
            simulationStep >= 4 
              ? 'bg-emerald-950/40 border-emerald-600 shadow-md shadow-emerald-500/10' 
              : 'bg-slate-900/60 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-2 font-semibold">
              <span>5. Pérdida Financiera</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-sm font-bold text-white mb-1">Ventas Perdidas</p>
            <p className="text-xs text-slate-300">
              Pérdida calculada: 72 uds × C$ 148 = <strong>C$ 10,656</strong> (C$ 142,500 en la categoría).
            </p>
            <div className="mt-3 text-[11px] text-emerald-400 font-mono bg-slate-950/60 p-1.5 rounded font-bold">
              Impacto: C$ 142.5k
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table: Lead Times by Supplier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Matriz de Desempeño y Retrasos de Proveedores
              </h2>
              <p className="text-xs text-slate-400">
                Comparativa de Lead Time Nominal vs Real y tasa de entregas a tiempo (OTIF)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-3 px-3">Proveedor</th>
                  <th className="py-3 px-3">Lead Time Nominal</th>
                  <th className="py-3 px-3">Lead Time Real</th>
                  <th className="py-3 px-3">Retraso Medio</th>
                  <th className="py-3 px-3">Entregas Tardías</th>
                  <th className="py-3 px-3">Cumplimiento</th>
                  <th className="py-3 px-3">Diagnóstico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {PROVEEDORES_DATA.map((prov) => (
                  <tr 
                    key={prov.cod}
                    onClick={() => setSelectedSupplier(prov.cod)}
                    className={`hover:bg-slate-700/50 cursor-pointer transition-colors ${
                      selectedSupplier === prov.cod ? 'bg-slate-700/60 font-medium' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-white">
                      {prov.nombre}
                    </td>
                    <td className="py-3 px-3">{prov.leadTimeNominal} días</td>
                    <td className="py-3 px-3 font-mono">{prov.leadTimeReal} días</td>
                    <td className="py-3 px-3 font-mono">
                      {prov.diasRetraso > 0 ? `+${prov.diasRetraso} d` : '0 d'}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {prov.entregasTardias} / {prov.entregasTotales}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              prov.cumplimientoPct >= 90 ? 'bg-emerald-500' :
                              prov.cumplimientoPct >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${prov.cumplimientoPct}%` }}
                          />
                        </div>
                        <span>{prov.cumplimientoPct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        prov.estado === 'Óptimo' ? 'bg-emerald-500/20 text-emerald-300' :
                        prov.estado === 'Aceptable' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-rose-500/20 text-rose-300'
                      }`}>
                        {prov.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Supplier Deep Dive */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Proveedor Seleccionado
            </span>
            <h3 className="text-lg font-bold text-white mt-1">{supplier.nombre}</h3>
            <p className="text-xs text-slate-400 mb-4">Contacto: {supplier.contacto}</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-slate-400 mb-0.5">Lead Time Promedio</div>
                <div className="text-xl font-bold text-white flex items-baseline gap-2">
                  <span>{supplier.leadTimeReal} días</span>
                  <span className="text-xs font-normal text-slate-400">
                    (Pactado: {supplier.leadTimeNominal} d)
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-slate-400 mb-0.5">Entregas con Retraso</div>
                <div className="text-xl font-bold text-amber-400">
                  {supplier.entregasTardias} órdenes ({((supplier.entregasTardias / supplier.entregasTotales) * 100).toFixed(1)}%)
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-slate-400 mb-0.5">Tasa de Devoluciones</div>
                <div className="text-xl font-bold text-rose-400">
                  {supplier.tasaDevolucionPct}% de productos
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-300">
            <span className="font-semibold text-white">Recomendación BI: </span>
            {supplier.estado === 'Crítico' 
              ? 'Incrementar el stock de seguridad a 25 días y negociar penalización por demoras en despachos.'
              : 'Proveedor estable. Mantener punto de reorden nominal actual.'}
          </div>
        </div>
      </div>
    </div>
  );
};

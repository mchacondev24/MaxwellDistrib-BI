import React, { useState } from 'react';
import { Award, Clock, HelpCircle, ChevronDown, ChevronUp, CheckCircle2, MessageSquare, Lightbulb } from 'lucide-react';

export const InterviewGuide: React.FC = () => {
  const [activeDuration, setActiveDuration] = useState<'30s' | '1m' | '3m' | '5m'>('1m');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pitches = {
    '30s': {
      title: "Elevator Pitch Ejecutivo (30 Segundos)",
      target: "Para el Director de Operaciones o Gerente General",
      script: `«Diseñé e implementé una solución integral de Business Intelligence para una empresa distribuidora en Nicaragua. El sistema automatiza con Python y Pandas la extracción y limpieza de reportes de compras, ventas e inventario que antes estaban dispersos en múltiples hojas de Excel con errores. Centralicé los datos en un Data Warehouse en MySQL bajo un modelo en estrella, exponiendo métricas clave como un margen bruto del 21.5% y una rotación de inventario de 5.8 veces al año. Además, desarrollé un tablero analítico que detectó un cuello de botella crítico en el proveedor de químicos, evitando pérdidas estimadas en más de C$ 140,000 en quiebres de stock.»`
    },
    '1m': {
      title: "Defensa Profesional (1 Minuto)",
      target: "Para el Lead de Datos o Gerente de BI",
      script: `«El objetivo de este proyecto fue demostrar el ciclo de vida completo de un proyecto de analítica de datos, desde la ingestión de datos crudos hasta la toma de decisiones estratégicas. 

Primero, identifiqué que los datos operativos llegaban en múltiples archivos Excel mensuales con problemas de calidad: registros duplicados, fechas inválidas y cantidades negativas. Construí un pipeline ETL en Python con reglas de Data Quality que perfila, limpia y genera un log de auditoría antes de cargar.

Segundo, diseñé un Data Warehouse dimensional en MySQL con tablas de hechos para ventas, compras e inventario conectadas a dimensiones comunes mediante claves subrogadas.

Tercero, modelé medidas en DAX para Power BI y construí un dashboard web interactivo. Como insight accionable de negocio, conectamos compras con inventario para evidenciar que un proveedor con lead time de 17 días estaba provocando desabastecimiento en la sucursal de León, permitiendo a la gerencia reajustar los puntos de reorden de inmediato.»`
    },
    '3m': {
      title: "Presentación Técnica Detallada (3 Minutos)",
      target: "Para Panel Técnico de Reclutamiento (Arquitectura & Negocio)",
      script: `«Buenas tardes. Les presento NicaDistrib BI, un proyecto de analítica de datos end-to-end diseñado para resolver los desafíos típicos de una distribuidora comercial en Nicaragua.

1. CAPA DE EXTRACCIÓN Y CALIDAD: En lugar de asumir datos perfectos, partí de la realidad: hojas de cálculo con errores humanos. El módulo 'extract.py' recopila los archivos mensuales y 'validate.py' ejecuta pruebas de integridad: unicidad de transacción, rango de fechas válidas y consistencia de SKUs. Todo registro que no supera el estándar se segrega a una carpeta de rechazados con su motivo exacto, asegurando trazabilidad.

2. MODELADO DIMENSIONAL: Para garantizar que las consultas analíticas no degraden el rendimiento, implementé un Star Schema en MySQL. Las tablas de hechos ('fact_ventas', 'fact_compras', 'fact_inventario') almacenan medidas cuantitativas y se conectan a dimensiones como fecha, producto, cliente y proveedor mediante claves subrogadas ('Surrogate Keys'). Esto desacopla el almacén analítico de los IDs transaccionales de origen y acelera los joins.

3. ANÁLISIS INTEGRADO Y DECISIÓN: Muchos dashboards se limitan a mostrar ventas pasadas. Aquí vinculé compras, inventario y ventas para analizar la cadena de suministro completa. Descubrimos que el producto 'Detergente Xedex' presentaba quiebres recurrentes no por falta de demanda, sino porque el proveedor local demoraba 5.1 días más de lo estipulado. Al cruzar el desabastecimiento con el ritmo de venta promedio, cuantificamos una pérdida de C$ 142,500 en ventas no realizadas.

4. INFRAESTRUCTURA: La solución está empaquetada con FastAPI para exponer microservicios REST, y el frontend está optimizado para su despliegue en servidores Apache con soporte de enrutamiento SPA mediante .htaccess.»`
    },
    '5m': {
      title: "Masterclass de Arquitectura End-to-End (5 Minutos)",
      target: "Para Entrevista Final con Stakeholders y Arquitectos de Datos",
      script: `«NicaDistrib BI nació para responder a una necesidad crítica en las empresas de consumo masivo: la desconexión entre lo que se compra, lo que se almacena y lo que se factura. Permítanme guiarles a través de las 4 capas arquitectónicas de la solución:

CAPA 1: INGESTIÓN Y AUDITORÍA
Implementé un pipeline modular en Python 3.10 estructurado en: extract, validate, transform y load. Durante la validación, el script no solo descarta registros corruptos, sino que genera métricas de 'Data Health Score' (en este caso, 99.17% de calidad tras corregir 24 anomalías en 2,906 registros). Las transformaciones estandarizan la moneda nacional (Córdobas - C$), calculan el IVA del 15% según la legislación tributaria nicaragüense y derivan la utilidad bruta unitaria.

CAPA 2: DATA WAREHOUSE EN MYSQL
Elegí un esquema en estrella (Star Schema) frente a la tercera forma normal (3NF) porque Power BI y los motores OLAP están optimizados para reducir la profundidad de los joins. Creamos una dimensión de tiempo continua con banderas de fin de semana para análisis de estacionalidad. Las tablas de hechos están indexadas de forma compuesta para responder a filtros simultáneos por fecha, departamento y categoría en menos de 15 milisegundos.

CAPA 3: MODELADO SEMÁNTICO Y DAX
Escribí medidas DAX estandarizadas aplicando mejores prácticas: uso de DIVIDE para controlar divisiones por cero, CALCULATE con DATEADD para análisis MoM (Month-over-Month) y medidas compuestas para la rotación de inventario (Costo de Ventas dividido entre Inventario Valorizado). Esto permitió clasificar los 20 SKUs en una matriz ABC de Pareto, demostrando que 5 productos generan más del 74% del ingreso de la compañía.

CAPA 4: IMPACTO EN NEGOCIO Y DESPLIEGUE
El mayor valor que aporta un Analista de Datos no son las gráficas, sino la recomendación de negocio. A través del módulo de 'Cuellos de Botella', recomendamos ajustar la política de inventario de seguridad de 12 a 20 días para la línea de higiene, mitigando el riesgo operativo con proveedores tardíos. Finalmente, configuramos el entorno de producción con Apache 2.4 y reglas de reescritura para garantizar alta disponibilidad en entornos cPanel compartidos o dedicados.»`
    }
  };

  const technicalQAs = [
    {
      q: "¿Por qué utilizaste Python para el ETL en lugar de hacer todo directamente en Power Query?",
      a: "Power Query es excelente para transformaciones a nivel de reporte, pero si múltiples analistas o aplicaciones necesitan consumir los datos, replicar la lógica en Power BI genera silos y riesgo de discrepancias. Con Python, la limpieza, validación y segregación de errores ocurren una sola vez en el servidor antes de tocar la base de datos, garantizando una única fuente de verdad (Single Source of Truth) auditable y reproducible."
    },
    {
      q: "¿Por qué un Star Schema y no dejar una sola tabla plana grande (Wide Table)?",
      a: "Las tablas planas consumen almacenamiento redundante al repetir nombres de clientes y productos millones de veces, lo que degrada el rendimiento de actualización y memoria RAM. El Star Schema mantiene las dimensiones normalizadas y la tabla de hechos estrecha con claves numéricas (integers), permitiendo que el motor tabular de Power BI comprima los datos eficientemente (VertiPaq) y ejecute agregaciones a gran velocidad."
    },
    {
      q: "¿Cómo calculas y para qué sirve la Rotación de Inventario?",
      a: "La fórmula es: Rotación = Costo de Mercancías Vendidas (COGS) / Inventario Promedio. Indica cuántas veces el inventario se vende y se reemplaza en un año. Una rotación baja (ej. 2x) significa capital estancado y riesgo de vencimiento en perecederos; una rotación excesivamente alta con poco stock puede provocar quiebres de inventario (stockouts). En este proyecto se calculó una rotación equilibrada de 5.8x (62.9 días)."
    },
    {
      q: "¿Cómo detectaste el cuello de botella en la cadena de suministros?",
      a: "Cruzamos la tabla fact_compras con fact_inventario y fact_ventas. Al calcular el Lead Time Real (fecha de recepción menos fecha de orden), notamos que el proveedor de químicos tenía un promedio de 17.1 días frente a los 12 acordados. Al correlacionar esto con el stockout de detergente en la sucursal de León, estimamos las ventas perdidas multiplicando la demanda diaria promedio por los días sin existencia."
    },
    {
      q: "¿Por qué utilizas Claves Subrogadas (Surrogate Keys) en lugar de las claves de negocio originales?",
      a: "Las claves de negocio (ej. código SKU o RUC de cliente) pueden cambiar en el sistema transaccional de origen o venir con formatos heterogéneos. La Surrogate Key es un entero auto-incremental independiente que blinda el Data Warehouse, soporta dimensiones que cambian lentamente (SCD) y hace que los joins de SQL y Power BI se resuelvan sobre números enteros simples, mejorando sustancialmente el rendimiento."
    },
    {
      q: "¿Cómo garantizaste que la aplicación Angular / React funcione en un servidor cPanel con Apache?",
      a: "Las aplicaciones Single Page Application (SPA) manejan el enrutamiento en el navegador mediante HTML5 History API. Si el usuario recarga la página en una subruta (como /dashboard), Apache busca esa carpeta física y devuelve un error 404. Lo solucionamos implementando un archivo .htaccess con RewriteRule para redirigir todas las peticiones que no sean archivos estáticos hacia index.html."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Módulo 9 — Preparación para Entrevistas Laborales
          </span>
          <span className="text-xs text-slate-400">Guión de Defensa & Preguntas Técnicas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Guía de Defensa del Proyecto en Entrevistas
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Guiones listos para presentar este portafolio ante reclutadores y gerentes técnicos según el tiempo disponible, además de 6 preguntas técnicas con sus respuestas fundamentadas.
        </p>
      </div>

      {/* Pitch Selector */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Selecciona la Duración de tu Intervención</span>
          </h2>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700">
            {(['30s', '1m', '3m', '5m'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveDuration(t)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeDuration === t 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-white">{pitches[activeDuration].title}</h3>
            <span className="text-[11px] text-blue-400 font-medium">{pitches[activeDuration].target}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {pitches[activeDuration].script}
          </p>
        </div>
      </div>

      {/* Technical Q&A Accordion */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Preguntas Frecuentes en Entrevistas Técnicas para Analistas de Datos BI</span>
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Respuestas estructuradas con justificación técnica y visión de negocio:
        </p>

        <div className="space-y-3">
          {technicalQAs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-3.5 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-blue-400 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

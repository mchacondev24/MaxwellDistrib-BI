import React from 'react';
import { Mail, Github, Linkedin, Globe, ShieldAlert, Heart } from 'lucide-react';
import { NicaraguaFlag } from './NicaraguaFlag';
import { AUTHOR_INFO } from '../data/nicaraguaData';

export const Footer: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-12">
      {/* Disclaimer banner */}
      <div className="bg-amber-950/20 border-b border-amber-900/30 px-4 py-2.5 text-center text-amber-300/90 text-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Aviso de Portafolio:</strong> Todos los datos, clientes, ventas y proveedores presentados en esta aplicación son <strong>ficticios</strong> para fines exclusivamente demostrativos y educativos de Business Intelligence.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-between">
          {/* Brand & Mission */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <NicaraguaFlag className="w-6 h-4" />
              <span className="text-white font-bold text-base tracking-tight">MaxwellDistrib BI (Demo para Portafolio)</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Solución integral de Business Intelligence y Data Analytics. Pipeline ETL (Python + Pandas) → Star Schema (MySQL) → Power BI & Dashboard Web interactivo.
            </p>
          </div>

          {/* Author Details */}
          <div className="text-center md:text-left space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
              Desarrollado Por
            </span>
            <p className="text-sm font-bold text-white">{AUTHOR_INFO.nombre}</p>
            <p className="text-xs text-slate-400">{AUTHOR_INFO.rol}</p>
            <p className="text-xs text-slate-500">{AUTHOR_INFO.pais}</p>
          </div>

          {/* Social Links & Contact Action */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2.5">
              <a
                href={AUTHOR_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-850 transition-all"
                title="GitHub de Maxwell Chacón"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={AUTHOR_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-slate-700 hover:bg-slate-850 transition-all"
                title="LinkedIn de Maxwell Chacón"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${AUTHOR_INFO.correo}`}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-slate-700 hover:bg-slate-850 transition-all"
                title="Enviar correo a Maxwell Chacón"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={AUTHOR_INFO.sitioWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 hover:bg-slate-850 transition-all"
                title="Sitio web de Maxwell Chacón"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={onOpenContact}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
            >
              Contactar al Desarrollador
            </button>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>&copy; {new Date().getFullYear()} Maxwell Chacón. Todos los derechos reservados.</span>
          <span>Desplegable en Apache / cPanel (<code className="text-slate-400">ingemaxwellchacon.com</code>)</span>
        </div>
      </div>
    </footer>
  );
};

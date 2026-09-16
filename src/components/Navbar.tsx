import React, { useState } from 'react';
import { NicaraguaFlag } from './NicaraguaFlag';
import { Mail, Github, Linkedin, Menu, X, Download, Database, ShieldAlert, Sparkles, User } from 'lucide-react';
import { AUTHOR_INFO } from '../data/nicaraguaData';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Ejecutivo' },
    { id: 'ventas', label: 'Ventas & Departamentos' },
    { id: 'compras', label: 'Compras & Proveedores' },
    { id: 'inventario', label: 'Inventario & Rotación' },
    { id: 'cuellos', label: 'Cuellos de Botella' },
    { id: 'etl', label: 'Pipeline ETL (Python)' },
    { id: 'excel', label: 'Descargar Excel' },
    { id: 'schema', label: 'Star Schema' },
    { id: 'powerbi', label: 'Power BI & DAX' },
    { id: 'codigo', label: 'Código Fuente' },
    { id: 'despliegue', label: 'Apache & cPanel' },
    { id: 'entrevista', label: 'Defensa Entrevista' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      {/* Top utility bar */}
      <div className="bg-slate-950/80 px-4 py-1.5 border-b border-slate-800/60 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <NicaraguaFlag className="w-5 h-3.5" />
          <span className="font-semibold text-slate-200 tracking-wide">MaxwellDistrib BI (Demo para Portafolio)</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 hidden sm:inline">Portafolio Profesional de Analista de Datos & Business Intelligence</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <ShieldAlert className="w-3 h-3" />
            Datos ficticios para fines demostrativos
          </span>

          <div className="flex items-center gap-2">
            <a
              href={AUTHOR_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="GitHub de Maxwell Chacón"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href={AUTHOR_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors"
              title="LinkedIn de Maxwell Chacón"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenContact}
              className="text-slate-300 hover:text-blue-400 font-medium transition-colors flex items-center gap-1"
            >
              <User className="w-3 h-3" />
              <span>{AUTHOR_INFO.nombre}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">MaxwellDistrib BI</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Demo para Portafolio
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">Business Intelligence & Distribución Comercial</p>
            </div>
          </div>

          {/* Desktop scrollable pills / tabs */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 max-w-2xl scrollbar-none">
            {navItems.slice(0, 7).map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => onSelectTab('excel')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Excel Datasets</span>
            </button>

            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contacto</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenContact}
              className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
              title="Contacto"
            >
              <Mail className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
          <div className="p-2 text-xs font-medium text-amber-400 bg-amber-500/10 rounded-lg border border-amber-500/20 mb-2">
            ⚠️ Datos ficticios generados para fines demostrativos de portafolio.
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

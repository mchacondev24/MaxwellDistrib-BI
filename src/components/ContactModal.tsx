import React, { useState } from 'react';
import { Mail, Github, Linkedin, Globe, Check, Copy, X, Server, ShieldCheck, Database, Award } from 'lucide-react';
import { AUTHOR_INFO } from '../data/nicaraguaData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AUTHOR_INFO.correo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent glow bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />
        
        {/* Header with Close */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Award className="w-3.5 h-3.5" /> Perfil Profesional
              </span>
              <span className="text-xs text-slate-400">Nicaragua</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">{AUTHOR_INFO.nombre}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{AUTHOR_INFO.rol}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact info cards */}
        <div className="space-y-3 mb-6">
          {/* Email card */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-slate-400 font-medium">Correo Electrónico</p>
                <a 
                  href={`mailto:${AUTHOR_INFO.correo}`}
                  className="text-sm font-semibold text-white hover:text-blue-400 truncate block transition-colors"
                >
                  {AUTHOR_INFO.correo}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors shrink-0 ml-2"
              title="Copiar correo"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copiado" : "Copiar"}</span>
            </button>
          </div>

          {/* LinkedIn card */}
          <a
            href={AUTHOR_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-blue-500/40 hover:bg-slate-800 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">LinkedIn Profesional</p>
                <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  in/ingemaxwellchacon
                </p>
              </div>
            </div>
            <span className="text-xs text-blue-400 font-medium">Visitar &rarr;</span>
          </a>

          {/* GitHub card */}
          <a
            href={AUTHOR_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-blue-500/40 hover:bg-slate-800 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-700/50 text-slate-300">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">GitHub / Repositorios de Código</p>
                <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  github.com/maxwellchacon
                </p>
              </div>
            </div>
            <span className="text-xs text-blue-400 font-medium">Visitar &rarr;</span>
          </a>

          {/* Web Server / Portfolio */}
          <a
            href={AUTHOR_INFO.sitioWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-blue-500/40 hover:bg-slate-800 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Sitio Web & Dominio de Producción</p>
                <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {AUTHOR_INFO.cPanelHost}
                </p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-medium">Abrir &rarr;</span>
          </a>
        </div>

        {/* Server deployment target details */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span>Infraestructura de Despliegue Apache / cPanel:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div><span className="text-slate-500">Host:</span> {AUTHOR_INFO.cPanelHost}</div>
            <div><span className="text-slate-500">Usuario cPanel:</span> {AUTHOR_INFO.cPanelUser}</div>
            <div className="col-span-2 truncate"><span className="text-slate-500">Directorio:</span> {AUTHOR_INFO.cPanelFolder}</div>
          </div>
        </div>

        {/* Actions footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

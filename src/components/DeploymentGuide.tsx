import React, { useState } from 'react';
import { Server, ShieldCheck, Check, Copy, Terminal, ExternalLink, Globe, Database, AlertCircle, FileText } from 'lucide-react';
import { AUTHOR_INFO } from '../data/nicaraguaData';

export const DeploymentGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-800/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Infraestructura & Producción
              </span>
              <span className="text-xs text-slate-400">cPanel / Apache 2.4 / MySQL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Guía de Despliegue en cPanel & Servidor Apache
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Instrucciones y automatizaciones para desplegar la aplicación Angular / Web en el servidor <code className="text-blue-300 font-mono">ingemaxwellchacon.com</code> dentro de la carpeta <code className="text-blue-300 font-mono">Portafolio/NicaDistrib-BI</code>.
            </p>
          </div>

          <a
            href={AUTHOR_INFO.cPanelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir cPanel Webmail/Admin</span>
          </a>
        </div>
      </div>

      {/* Server Specs Card */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-400" />
          <span>Parámetros del Servidor Host</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-slate-500 block mb-0.5">Dominio Principal:</span>
            <span className="font-mono text-white font-semibold">{AUTHOR_INFO.cPanelHost}</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-slate-500 block mb-0.5">Directorio Raíz Web:</span>
            <span className="font-mono text-white font-semibold">public_html</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="text-slate-500 block mb-0.5">Destino en la Web:</span>
            <span className="font-mono text-emerald-400 font-semibold">{AUTHOR_INFO.cPanelFolder}</span>
          </div>
        </div>
      </div>

      {/* Deployment Steps */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="text-sm font-bold text-white">Compilar la Aplicación de Producción</h3>
            </div>
            <button
              onClick={() => copyCommand("npm run build", "cmd1")}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
            >
              {copiedCmd === "cmd1" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd === "cmd1" ? "Copiado" : "Copiar"}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Genera los archivos estáticos minimizados en la carpeta <code className="text-blue-300 font-mono">dist/</code>.
          </p>
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-blue-300">
            npm run build
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="text-sm font-bold text-white">Subir a cPanel en public_html/Portafolio/NicaDistrib-BI</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            En el Administrador de Archivos de cPanel, crea la carpeta <code className="text-blue-300 font-mono">public_html/Portafolio/NicaDistrib-BI</code> y sube el contenido de <code className="text-blue-300 font-mono">dist/</code> junto al archivo <code className="text-blue-300 font-mono">.htaccess</code>.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
              <h3 className="text-sm font-bold text-white">Configuración del Archivo .htaccess (Evitar Error 404 en SPA)</h3>
            </div>
            <button
              onClick={() => copyCommand(`RewriteEngine On\nRewriteBase /Portafolio/NicaDistrib-BI/\nRewriteRule ^index\\.html$ - [L]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /Portafolio/NicaDistrib-BI/index.html [L]`, "cmd3")}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
            >
              {copiedCmd === "cmd3" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd === "cmd3" ? "Copiado" : "Copiar .htaccess"}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Garantiza que cualquier ruta o recarga del navegador (F5) sea redirigida a <code className="text-blue-300 font-mono">index.html</code> sin arrojar 404 Not Found de Apache.
          </p>
          <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre">
{`RewriteEngine On
RewriteBase /Portafolio/NicaDistrib-BI/
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /Portafolio/NicaDistrib-BI/index.html [L]`}
          </pre>
        </div>

        {/* Step 4: MySQL */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</span>
              <h3 className="text-sm font-bold text-white">Opción A: Importar en MySQL de cPanel (phpMyAdmin)</h3>
            </div>
            <button
              onClick={() => copyCommand("mysql -u ingefknc_bi -p ingefknc_nicadistrib_dw < database/schema.sql", "cmd4")}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
            >
              {copiedCmd === "cmd4" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd === "cmd4" ? "Copiado" : "Copiar Comando"}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            En la sección "Bases de datos MySQL" de cPanel, crea la base <code className="text-blue-300 font-mono">ingefknc_nicadistrib_dw</code> y ejecuta el script <code className="text-blue-300 font-mono">database/schema.sql</code> desde phpMyAdmin.
          </p>
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-blue-300">
            mysql -u ingefknc_bi -p ingefknc_nicadistrib_dw &lt; database/schema.sql
          </div>
        </div>

        {/* Step 5: SQLite Zero-Config */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-800/90 to-slate-800/90 border border-emerald-500/40 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">5</span>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Opción B Demo: SQLite Autónomo (Zero-Config)</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Recomendado para Demo</span>
              </h3>
            </div>
            <button
              onClick={() => copyCommand("sqlite3 database/maxwelldistrib_demo.sqlite < database/schema_sqlite.sql", "cmd5")}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
            >
              {copiedCmd === "cmd5" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd === "cmd5" ? "Copiado" : "Copiar Comando"}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            Si no deseas configurar usuarios ni permisos en MySQL en cPanel, el proyecto incluye una base de datos SQLite pre-creada con todas las dimensiones y hechos en <code className="text-emerald-300 font-mono">database/maxwelldistrib_demo.sqlite</code> (y su DDL <code className="text-emerald-300 font-mono">database/schema_sqlite.sql</code>). La web app es 100% interactiva en el cliente y no requiere ningún demonio de base de datos encendido en el hosting.
          </p>
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
            sqlite3 database/maxwelldistrib_demo.sqlite &lt; database/schema_sqlite.sql
          </div>
        </div>
      </div>
    </div>
  );
};

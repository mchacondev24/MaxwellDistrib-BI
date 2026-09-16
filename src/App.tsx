import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { SalesAnalytics } from './components/SalesAnalytics';
import { SupplierAnalytics } from './components/SupplierAnalytics';
import { InventoryAnalytics } from './components/InventoryAnalytics';
import { BottlenecksAnalyzer } from './components/BottlenecksAnalyzer';
import { EtlSimulator } from './components/EtlSimulator';
import { ExcelDownloader } from './components/ExcelDownloader';
import { StarSchemaViewer } from './components/StarSchemaViewer';
import { PowerBiDaxCatalog } from './components/PowerBiDaxCatalog';
import { SourceCodeViewer } from './components/SourceCodeViewer';
import { DeploymentGuide } from './components/DeploymentGuide';
import { InterviewGuide } from './components/InterviewGuide';
import { 
  BarChart3, 
  MapPin, 
  Truck, 
  Package, 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  Database, 
  BookOpen, 
  Code, 
  Server, 
  Award,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const tabs = [
    { id: 'dashboard', label: '1. Dashboard Ejecutivo', icon: BarChart3 },
    { id: 'ventas', label: '2. Ventas & Deptos', icon: MapPin },
    { id: 'compras', label: '3. Proveedores & Compras', icon: Truck },
    { id: 'inventario', label: '4. Inventario & Rotación', icon: Package },
    { id: 'cuellos', label: '5. Cuellos de Botella', icon: AlertTriangle },
    { id: 'etl', label: '6. Pipeline ETL (Python)', icon: RefreshCw },
    { id: 'excel', label: '7. Descargar Excel', icon: Download },
    { id: 'schema', label: '8. Star Schema (MySQL)', icon: Database },
    { id: 'powerbi', label: '9. Power BI & DAX', icon: BookOpen },
    { id: 'codigo', label: '10. Código Fuente', icon: Code },
    { id: 'despliegue', label: '11. Apache & cPanel', icon: Server },
    { id: 'entrevista', label: '12. Defensa Entrevista', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        onOpenContact={() => setContactOpen(true)} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Module Breadcrumb & Quick Tabs Bar */}
        <div className="mb-6 p-2 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Switcher */}
        {activeTab === 'dashboard' && <ExecutiveDashboard onNavigate={setActiveTab} />}
        {activeTab === 'ventas' && <SalesAnalytics />}
        {activeTab === 'compras' && <SupplierAnalytics />}
        {activeTab === 'inventario' && <InventoryAnalytics />}
        {activeTab === 'cuellos' && <BottlenecksAnalyzer />}
        {activeTab === 'etl' && <EtlSimulator />}
        {activeTab === 'excel' && <ExcelDownloader />}
        {activeTab === 'schema' && <StarSchemaViewer />}
        {activeTab === 'powerbi' && <PowerBiDaxCatalog />}
        {activeTab === 'codigo' && <SourceCodeViewer />}
        {activeTab === 'despliegue' && <DeploymentGuide />}
        {activeTab === 'entrevista' && <InterviewGuide />}
      </main>

      {/* Footer with Author Information & Disclaimer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Contact & Professional Profile Modal */}
      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />
    </div>
  );
}

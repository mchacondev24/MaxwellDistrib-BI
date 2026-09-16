import React, { ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Se detectó una incidencia al cargar</h2>
            <p className="text-xs text-slate-400">
              {this.state.error?.message || 'Error desconocido al inicializar los componentes.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Recargar Aplicación
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

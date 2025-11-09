import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { storageService, EcoAction } from './lib/storage';
import { ActionForm } from './components/ActionForm';
import { ImpactDashboard } from './components/ImpactDashboard';
import { ActionHistory } from './components/ActionHistory';

function App() {
  const [actions, setActions] = useState<EcoAction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadActions = () => {
    setLoading(true);
    const data = storageService.getActions();
    const sortedData = [...data].sort((a, b) =>
      new Date(b.action_date).getTime() - new Date(a.action_date).getTime()
    );
    setActions(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    loadActions();
  }, []);

  const calculateStats = () => {
    return {
      reforestacion: actions
        .filter((a) => a.action_type === 'reforestacion')
        .reduce((sum, a) => sum + Number(a.quantity), 0),
      reciclaje: actions
        .filter((a) => a.action_type === 'reciclaje')
        .reduce((sum, a) => sum + Number(a.quantity), 0),
      ahorro_energetico: actions
        .filter((a) => a.action_type === 'ahorro_energetico')
        .reduce((sum, a) => sum + Number(a.quantity), 0),
      totalActions: actions.length
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-green-600" fill="currentColor" />
            <h1 className="text-5xl font-bold text-gray-800">
              EcoAcción<span className="text-green-600">RD</span>
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Mide y celebra el impacto de tus acciones ecológicas en República Dominicana
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Reciclaje • Reforestación • Ahorro Energético
          </p>
        </header>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando acciones...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <ImpactDashboard stats={calculateStats()} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ActionForm onActionAdded={loadActions} />
              <ActionHistory actions={actions} />
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p className="mb-2">
            Convirtiendo datos en conciencia ecológica y acción social
          </p>
          <p className="text-xs text-gray-500">
            Juntos por un futuro más verde en República Dominicana
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

import { Leaf, Recycle, Zap, Calendar, MapPin, Users } from 'lucide-react';
import { EcoAction } from '../lib/storage';

interface ActionHistoryProps {
  actions: EcoAction[];
}

export function ActionHistory({ actions }: ActionHistoryProps) {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'reforestacion':
        return { Icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' };
      case 'reciclaje':
        return { Icon: Recycle, color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'ahorro_energetico':
        return { Icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' };
      default:
        return { Icon: Leaf, color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const getActionLabel = (type: string) => {
    switch (type) {
      case 'reforestacion':
        return 'Reforestación';
      case 'reciclaje':
        return 'Reciclaje';
      case 'ahorro_energetico':
        return 'Ahorro Energético';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (actions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="text-gray-400 mb-4">
          <Leaf className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Aún no hay acciones registradas
        </h3>
        <p className="text-gray-600">
          Comienza a registrar las acciones ecológicas de tu grupo para ver el impacto.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial de Acciones</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {actions.map((action) => {
          const { Icon, color, bg } = getActionIcon(action.action_type);

          return (
            <div
              key={action.id}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`${bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {getActionLabel(action.action_type)}
                      </h3>
                      <div className="text-2xl font-bold text-gray-900 mt-1">
                        {action.quantity.toLocaleString()} {action.unit}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{action.group_name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{action.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(action.action_date)}</span>
                    </div>

                    {action.description && (
                      <p className="text-sm text-gray-700 mt-3 italic border-l-2 border-gray-300 pl-3">
                        {action.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Leaf, Recycle, Zap } from 'lucide-react';
import { storageService } from '../lib/storage';

type ActionType = 'reciclaje' | 'reforestacion' | 'ahorro_energetico';

interface ActionFormProps {
  onActionAdded: () => void;
}

export function ActionForm({ onActionAdded }: ActionFormProps) {
  const [actionType, setActionType] = useState<ActionType>('reforestacion');
  const [quantity, setQuantity] = useState('');
  const [groupName, setGroupName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [actionDate, setActionDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const actionConfig = {
    reforestacion: {
      icon: Leaf,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      label: 'Reforestación',
      unit: 'árboles',
      placeholder: '¿Cuántos árboles plantaron?'
    },
    reciclaje: {
      icon: Recycle,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      label: 'Reciclaje',
      unit: 'kg',
      placeholder: '¿Cuántos kg reciclaron?'
    },
    ahorro_energetico: {
      icon: Zap,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600',
      label: 'Ahorro Energético',
      unit: 'kWh',
      placeholder: '¿Cuántos kWh ahorraron?'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantity || !groupName || !location) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    const config = actionConfig[actionType];
    storageService.addAction({
      action_type: actionType,
      quantity: parseFloat(quantity),
      unit: config.unit,
      group_name: groupName.trim(),
      location: location.trim(),
      description: description.trim(),
      action_date: actionDate
    });

    setIsSubmitting(false);

    setQuantity('');
    setGroupName('');
    setLocation('');
    setDescription('');
    setActionDate(new Date().toISOString().split('T')[0]);
    onActionAdded();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registrar Acción Ecológica</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tipo de Acción
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(actionConfig) as ActionType[]).map((type) => {
              const config = actionConfig[type];
              const Icon = config.icon;
              const isSelected = actionType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActionType(type)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? `${config.color} border-transparent text-white shadow-md`
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
              Cantidad ({actionConfig[actionType].unit})
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={actionConfig[actionType].placeholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="actionDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              id="actionDate"
              value={actionDate}
              onChange={(e) => setActionDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label htmlFor="groupName" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre del Grupo
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Ej: Eco-Estudiantes UASD"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ej: Santo Domingo, Parque Mirador"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción (Opcional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles adicionales sobre la acción..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-lg font-semibold text-white transition shadow-md ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : `${actionConfig[actionType].color} ${actionConfig[actionType].hoverColor} shadow-lg hover:shadow-xl`
          }`}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar Acción'}
        </button>
      </form>
    </div>
  );
}

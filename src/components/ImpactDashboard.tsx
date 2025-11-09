import { Leaf, Recycle, Zap, TrendingUp } from 'lucide-react';

interface ImpactStats {
  reforestacion: number;
  reciclaje: number;
  ahorro_energetico: number;
  totalActions: number;
}

interface ImpactDashboardProps {
  stats: ImpactStats;
}

export function ImpactDashboard({ stats }: ImpactDashboardProps) {
  const impactCards = [
    {
      icon: Leaf,
      color: 'bg-green-500',
      gradient: 'from-green-400 to-green-600',
      label: 'Árboles Plantados',
      value: stats.reforestacion,
      unit: 'árboles',
      impact: `≈ ${Math.round(stats.reforestacion * 22)} kg CO₂ capturados/año`
    },
    {
      icon: Recycle,
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600',
      label: 'Material Reciclado',
      value: stats.reciclaje,
      unit: 'kg',
      impact: `≈ ${Math.round(stats.reciclaje * 0.7)} kg CO₂ evitados`
    },
    {
      icon: Zap,
      color: 'bg-amber-500',
      gradient: 'from-amber-400 to-amber-600',
      label: 'Energía Ahorrada',
      value: stats.ahorro_energetico,
      unit: 'kWh',
      impact: `≈ ${Math.round(stats.ahorro_energetico * 0.5)} kg CO₂ evitados`
    }
  ];

  const totalCO2Impact =
    Math.round(stats.reforestacion * 22) +
    Math.round(stats.reciclaje * 0.7) +
    Math.round(stats.ahorro_energetico * 0.5);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Impacto Total</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <div className="text-5xl font-bold mb-2">{stats.totalActions}</div>
            <div className="text-green-100 font-medium">Acciones Registradas</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <div className="text-5xl font-bold mb-2">{totalCO2Impact.toLocaleString()}</div>
            <div className="text-green-100 font-medium">kg CO₂ Impacto Estimado</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-br ${card.gradient} p-6 text-white`}>
                <Icon className="w-10 h-10 mb-3" />
                <div className="text-4xl font-bold mb-1">
                  {card.value.toLocaleString()}
                </div>
                <div className="text-sm font-medium opacity-90">{card.unit}</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">{card.label}</h3>
                <p className="text-sm text-gray-600">{card.impact}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

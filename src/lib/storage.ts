export type EcoAction = {
  id: string;
  action_type: 'reciclaje' | 'reforestacion' | 'ahorro_energetico';
  quantity: number;
  unit: string;
  group_name: string;
  location: string;
  description: string;
  action_date: string;
  created_at: string;
};

const STORAGE_KEY = 'eco-actions-rd';

export const storageService = {
  getActions: (): EcoAction[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveActions: (actions: EcoAction[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
  },

  addAction: (action: Omit<EcoAction, 'id' | 'created_at'>): EcoAction => {
    const actions = storageService.getActions();
    const newAction: EcoAction = {
      ...action,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    actions.push(newAction);
    storageService.saveActions(actions);
    return newAction;
  }
};

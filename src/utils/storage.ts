import { Obra } from '../types/obra';

const STORAGE_KEY = 'diario_obras_app_data_v1';

export const loadObrasFromStorage = (): Obra[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Erro ao carregar obras do localStorage:', error);
    return [];
  }
};

export const saveObrasToStorage = (obras: Obra[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obras));
  } catch (error) {
    console.error('Erro ao salvar obras no localStorage:', error);
  }
};

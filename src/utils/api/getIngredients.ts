import { api } from './api';

import type { TIngredient, TIngredientsResponse } from '../types';

export const getIngredients = async (): Promise<TIngredient[]> => {
  const response = await api.get<TIngredientsResponse>('/ingredients');
  return response.data.data;
};

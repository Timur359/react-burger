import { create } from 'axios';

import type { TIngredient, TOrderResponse } from '../types';
import type { AxiosInstance } from 'axios';

export const api: AxiosInstance = create({
  baseURL: 'https://new-stellarburgers.education-services.ru/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const getIngredients = async (): Promise<TIngredient[]> => {
  const response = await api.get<{ success: boolean; data: TIngredient[] }>('/ingredients');
  return response.data.data;
};

export const createOrder = async (ingredientIds: string[]): Promise<number> => {
  const response = await api.post<TOrderResponse>('/orders', { ingredients: ingredientIds });
  return response.data.order.number;
};

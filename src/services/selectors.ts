import { createSelector } from '@reduxjs/toolkit';

import type { TConstructorState } from './slices/constructor-slice';
import type { RootState } from './store';
import type { TIngredient } from '@/utils';

export const selectIngredients = (state: RootState): TIngredient[] => state.ingredients.items;
export const selectConstructor = (state: RootState): TConstructorState => state.burgerConstructor;
export const selectOrderNumber = (state: RootState): number | null => state.order.orderNumber;

export const selectCounters = createSelector(
  [selectIngredients, selectConstructor],
  (ingredients, { bun, ingredients: filling }) => {
    const counts: Record<string, number> = {};

    if (bun) {
      counts[bun._id] = 2;
    }

    filling.forEach((item) => {
      counts[item._id] = (counts[item._id] || 0) + 1;
    });

    return counts;
  }
);

export const selectTotalPrice = createSelector(
  [selectConstructor],
  ({ bun, ingredients }): number => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const fillingsPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
    return bunPrice + fillingsPrice;
  }
);

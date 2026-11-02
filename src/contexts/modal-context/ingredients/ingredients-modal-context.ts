import { createContext } from 'react';

import type { TIngredient } from '@/utils';

export type TIngredientsModalContext = {
  selectedIngredient: TIngredient | null;
  openIngredientsModal: (ingredient: TIngredient) => void;
  closeModal: () => void;
};

export const IngredientsModalContext = createContext<TIngredientsModalContext | null>(null);

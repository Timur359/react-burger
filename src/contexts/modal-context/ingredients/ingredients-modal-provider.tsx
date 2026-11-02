import { useState, type JSX, type ReactNode } from 'react';

import { IngredientsModalContext } from './ingredients-modal-context';

import type { TIngredient } from '@/utils';

export const IngredientsModalProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);

  const openIngredientsModal = (ingredient: TIngredient): void => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = (): void => {
    setSelectedIngredient(null);
  };

  return (
    <IngredientsModalContext.Provider
      value={{ selectedIngredient, openIngredientsModal, closeModal }}
    >
      {children}
    </IngredientsModalContext.Provider>
  );
};

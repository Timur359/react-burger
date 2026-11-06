import { useContext } from 'react';

import {
  IngredientsModalContext,
  type TIngredientsModalContext,
} from './ingredients-modal-context';

export const useIngredientsModal = (): TIngredientsModalContext => {
  const context = useContext(IngredientsModalContext);
  if (!context) {
    throw new Error('useIngredientsModal нужно использовать внутри IngredientsModalProvider');
  }
  return context;
};

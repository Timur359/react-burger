import { useContext } from 'react';

import { OrderModalContext } from './order-modal-context';

import type { TOrderModalContext } from './order-modal-context';

export const useOrderModal = (): TOrderModalContext => {
  const context = useContext(OrderModalContext);
  if (!context) {
    throw new Error('useOrderModal нужно использовать внутри OrderModalProvider');
  }
  return context;
};

import { createContext } from 'react';

export type TOrderModalContext = {
  isOrderModalOpen: boolean;
  orderNumber: string | null;
  openOrderModal: () => void;
  closeOrderModal: () => void;
};

export const OrderModalContext = createContext<TOrderModalContext | null>(null);

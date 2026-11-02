import { useState, type JSX, type ReactNode } from 'react';

import { OrderModalContext } from './order-modal-context';

export const OrderModalProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const openOrderModal = (): void => {
    setOrderNumber('123');
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = (): void => {
    setIsOrderModalOpen(false);
    setOrderNumber(null);
  };

  return (
    <OrderModalContext.Provider
      value={{ isOrderModalOpen, orderNumber, openOrderModal, closeOrderModal }}
    >
      {children}
    </OrderModalContext.Provider>
  );
};

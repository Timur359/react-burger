import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@components/app/app';
import { IngredientsModalProvider, OrderModalProvider } from '@contexts/index';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IngredientsModalProvider>
      <OrderModalProvider>
        <App />
      </OrderModalProvider>
    </IngredientsModalProvider>
  </StrictMode>
);

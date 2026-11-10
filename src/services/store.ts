import { configureStore } from '@reduxjs/toolkit';

import constructorReducer from './slices/constructor-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

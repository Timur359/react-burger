import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createOrder } from '@utils/api';

type TOrderState = {
  orderNumber: number | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderNumber: null,
  isLoading: false,
  error: null,
};

export const sendOrder = createAsyncThunk('order/sendOrder', async (ingredientIds: string[]) => {
  return await createOrder(ingredientIds);
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderNumber: (state) => {
      state.orderNumber = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка заказа';
      });
  },
});

export const { clearOrderNumber } = orderSlice.actions;
export default orderSlice.reducer;

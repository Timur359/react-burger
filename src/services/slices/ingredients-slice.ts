import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getIngredients } from '@utils/api';

import type { TIngredient } from '@utils/types';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
  selectedIngredient: TIngredient | null;
};

const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  error: null,
  selectedIngredient: null,
};

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  return await getIngredients();
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<TIngredient | null>) => {
      state.selectedIngredient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      });
  },
});

export const { setSelectedIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

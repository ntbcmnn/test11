import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import { getCategories } from '../thunks/categoriesThunk.ts';
import { RootState } from '../../app/store.ts';

interface CategoryState {
  categories: ICategory[];
  isLoading: boolean;
  error: boolean;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: false,
};

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) =>  state.categories.isLoading;

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getCategories.fulfilled, (state, {payload: categoriesResponse}) => {
        state.isLoading = false;
        state.categories = categoriesResponse;
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }
});

export const categoriesReducer = categoriesSlice.reducer;
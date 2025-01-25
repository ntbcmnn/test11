import { createSlice } from '@reduxjs/toolkit';
import { IProduct, ValidationError } from '../../types';
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts, getProductsByCategory,
} from '../thunks/productsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ProductState {
  products: IProduct[];
  product: IProduct | null;
  isFetching: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  creatingError: ValidationError | null;
  error: boolean;
}

const initialState: ProductState = {
  products: [],
  product: null,
  isFetching: false,
  isCreating: false,
  isDeleting: false,
  creatingError: null,
  error: false,
};

export const selectProducts = (state: RootState) => state.products.products;
export const selectProduct = (state: RootState) => state.products.product;

export const selectCreatingLoading = (state: RootState) => state.products.isCreating;
export const selectDeletingLoading = (state: RootState) => state.products.isDeleting;
export const selectFetchingLoading = (state: RootState) => state.products.isFetching;

export const selectCreatingError = (state: RootState) => state.products.creatingError;

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(getProducts.fulfilled, (state, {payload: productsRes}) => {
        state.isFetching = false;
        state.products = productsRes;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(getProductById.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(getProductById.fulfilled, (state, {payload: productRes}) => {
        state.isFetching = false;
        state.product = productRes || null;
      })
      .addCase(getProductById.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(getProductsByCategory.fulfilled, (state, {payload: productsRes}) => {
        state.isFetching = false;
        state.products = productsRes;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleting = true;
        state.error = false;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isDeleting = false;
        state.error = true;
      })
      .addCase(addProduct.pending, (state) => {
        state.isCreating = true;
        state.creatingError = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addProduct.rejected, (state, {payload: error}) => {
        state.isCreating = false;
        state.creatingError = error || null;
      });
  }
});

export const productsReducer = productsSlice.reducer;
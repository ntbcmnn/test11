import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct, IProductMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const addProduct = createAsyncThunk<
  IProduct,
  { productMutation: IProductMutation },
  { state: RootState; rejectValue: ValidationError }
>
('products/addProduct',
  async ({productMutation}, {getState, rejectWithValue}) => {
    const token = getState().users.user?.token;

    try {
      const formData = new FormData();
      const keys = Object.keys(productMutation) as (keyof IProductMutation)[];

      keys.forEach((key) => {
        const value = productMutation[key];

        if (key === 'category' && value && typeof value === 'object' && '_id' in value) {
          formData.append(key, value._id);
        } else if (value !== null) {
          formData.append(key, value as string | Blob);
        }
      });

      const response = await axiosApi.post<IProduct>('/products', formData, {
        headers: {Authorization: token},
      });

      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  }
);

export const getProducts = createAsyncThunk<IProduct[], void>(
  'products/getProducts',
  async () => {
    const response = await axiosApi.get<IProduct[]>('/products');
    return response.data;
  }
);

export const getProductById = createAsyncThunk<IProduct, string>(
  'products/getProductById',
  async (productId) => {
    const response = await axiosApi.get<IProduct>(`/products/${productId}`);
    return response.data;
  }
);

export const getProductsByCategory = createAsyncThunk<IProduct[], string>
(
  'products/getProductsByCategory',
  async (categoryId) => {
    const response = await axiosApi.get<IProduct[]>(`/products/category/${categoryId}`);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk<
  void,
  string,
  { state: RootState }
>(
  'products/deleteProduct',
  async (productId, {getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete(`products/${productId}`, {headers: {'Authorization': token}});
  }
);

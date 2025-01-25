import { ICategory } from '../../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const getCategories = createAsyncThunk<ICategory[], void>
('categories/getCategories',
  async () => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return response.data;
  }
);
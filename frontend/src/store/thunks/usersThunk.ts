import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  IUser,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>(
  "users/register",
  async (registerMutation: RegisterMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>(
        "/users/register",
        registerMutation,
      );
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const login = createAsyncThunk<
  IUser,
  LoginMutation,
  { rejectValue: GlobalError }
>("users/login", async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      "/users/sessions",
      loginMutation,
    );
    return response.data.user;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  "users/logout",
  async (_, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete("/users/sessions", {
      headers: { Authorization: token },
    });
  },
);

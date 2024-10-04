// src/features/auth/authActions.ts
import { loginAPI, logoutAPI } from "@api/authAPI";
import { LoginEntity } from "@/types/AuthTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { secureLocalStorage } from "@/utility/SecureStorage";

export const login = createAsyncThunk(
  "auth/login", // Nama action
  async (credentials: LoginEntity, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      const { token } = response;

      // Simpan token ke localStorage
      secureLocalStorage.setItem("TOKEN", token);

      // Mengembalikan token sebagai payload
      return token;
    } catch (error: any) {
      // Mengembalikan error sebagai reject
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
      return "Logout Success";
    } catch (error) {
      return rejectWithValue("Logout Failed");
    }
  }
);

// src/lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  //TODO: ganti dengan url server anda
  baseURL: import.meta.env.VITE_API_URL ?? "https://your-api-url.com",
  timeout: 10000, // Timeout bisa diatur sesuai kebutuhan
  headers: {
    "Content-Type": "application/json",
  },
});

// Kamu bisa menambahkan interceptor di sini jika diperlukan
axiosInstance.interceptors.request.use(
  (config) => {
    // Contoh: Menambahkan token jika ada
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Kamu bisa menambahkan logika error handling di sini
    return Promise.reject(error);
  }
);

export default axiosInstance;

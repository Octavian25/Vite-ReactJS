import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Dashboard } from "./layout/Dashboard.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./lib/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { LoginScreen } from "@layout/Login.tsx";
import { ForgotPasswordScreen } from "@layout/ForgotPassword.tsx";
import { RegisterScreen } from "@layout/Register.tsx";
import { secureLocalStorage } from "./utility/SecureStorage.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./config/i18n.ts"; // Impor konfigurasi i18n
import { GlobalRoutes } from "./types/RoutesTypes.ts";
import { EmptyPage } from "./layout/EmptyPage.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: secureLocalStorage.getItem("TOKEN") ? (
      <Navigate to={"/dashboard"} />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  {
    path: "/dashboard",
    element: secureLocalStorage.getItem("TOKEN") ? (
      <Dashboard />
    ) : (
      <Navigate to="/login" />
    ),
    errorElement: <h1>TIDAK KETEMU</h1>,
    children: routes.map((data: GlobalRoutes) => {
      return {
        path: data.path,
        element: data.element,
        children: data.child?.map((child: GlobalRoutes) => {
          return {
            path: child.path,
            element: child.element,
          };
        }),
      };
    }),
  },
  {
    path: "*",
    element: <EmptyPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light">
    <Provider store={store}>
      <React.Fragment>
        <RouterProvider router={router} />
        <Toaster />
      </React.Fragment>
    </Provider>
  </ThemeProvider>
);

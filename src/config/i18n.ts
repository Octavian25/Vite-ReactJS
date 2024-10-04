import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import resources (translations)
import en from "./locales/en.json";
import id from "./locales/id.json";

// Definisikan resources (bahasa yang didukung)
const resources = {
  en: {
    translation: en,
  },
  id: {
    translation: id,
  },
};

// Inisialisasi i18n
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en", // Set bahasa default
  fallbackLng: "en", // Jika bahasa tidak ditemukan, fallback ke bahasa Inggris
  interpolation: {
    escapeValue: false, // React sudah aman terhadap XSS
  },
});

export default i18n;

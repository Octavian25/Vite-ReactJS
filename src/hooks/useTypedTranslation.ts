import { TranslationKeys, TRANSLATIONS } from "@/config/constant/translations";
import { useTranslation as useTranslationBase } from "react-i18next";

// Custom hook untuk memberikan akses `t` dengan properti
export const useTypedTranslation = () => {
  const { t: tBase, i18n } = useTranslationBase();

  // Kembalikan terjemahan sebagai object yang mudah digunakan
  const t: Record<TranslationKeys, string> = Object.keys(TRANSLATIONS).reduce(
    (acc, key) => {
      acc[key as TranslationKeys] = tBase(key);
      return acc;
    },
    {} as Record<TranslationKeys, string>
  );

  // Buat fungsi terpisah untuk terjemahan dinamis
  const tDynamic = (key: string) => {
    return tBase(key); // Menggunakan key dinamis
  };

  return { t, tDynamic, i18n };
};

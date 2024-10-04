import CryptoJS from "crypto-js";

// Kunci enkripsi rahasia
const SECRET_KEY = import.meta.env.VITE_KEY;

// Fungsi untuk membuat hash dari key menggunakan SHA-256
const hashKey = (key: string) => {
  return CryptoJS.SHA256(key).toString();
};

// Fungsi untuk mengenkripsi value
const encryptValue = (value: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
};

// Fungsi untuk mendekripsi value
const decryptValue = (encryptedValue: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Fungsi untuk menyimpan data ke localStorage dengan key yang di-hash
export const secureLocalStorage = {
  setItem: (key: string, value: any) => {
    try {
      const hashedKey = hashKey(key); // Hash key terlebih dahulu
      const encryptedValue = encryptValue(value); // Enkripsi value
      localStorage.setItem(hashedKey, encryptedValue); // Simpan key dan value yang terenkripsi
    } catch (error) {
      console.error("Failed to set item in localStorage", error);
    }
  },

  // Fungsi untuk mengambil data dari localStorage
  getItem: (key: string) => {
    try {
      const hashedKey = hashKey(key); // Hash key terlebih dahulu
      const encryptedValue = localStorage.getItem(hashedKey); // Ambil value yang terenkripsi
      if (!encryptedValue) return null;

      const decryptedValue = decryptValue(encryptedValue); // Dekripsi value
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error("Failed to get item from localStorage", error);
      return null;
    }
  },

  // Fungsi untuk menghapus item dari localStorage
  removeItem: (key: string) => {
    try {
      const hashedKey = hashKey(key); // Hash key terlebih dahulu
      localStorage.removeItem(hashedKey);
    } catch (error) {
      console.error("Failed to remove item from localStorage", error);
    }
  },
};

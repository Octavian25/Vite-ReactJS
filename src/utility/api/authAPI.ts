import { LoginEntity } from "./../../types/AuthTypes";

export const loginAPI = async (
  credentials: LoginEntity
): Promise<{ token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (
          credentials.email == "admin@gmail.com" &&
          credentials.password == "admin"
        ) {
          resolve({ token: "YOUR TOKEN" });
        } else {
          reject({
            response: {
              data: {
                message: "Username or password incorrect",
              },
            },
          });
        }
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
  // const response = await axiosInstance.post("/login", {});
  // return response.data;
};

export const logoutAPI = async (): Promise<string> => {
  // await axiosInstance.post("/logout");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve("LOGOUT SUCCESS");
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
};

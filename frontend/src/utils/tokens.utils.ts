export const setToken = (name: string, token: string): void => {
  localStorage.setItem(name, token);
};

export const getToken = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const removeToken = (name: string): void => {
  localStorage.removeItem(name);
};

export const removesTokens = (): void => {
  removeToken("accessToken");
  removeToken("refreshToken");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
export const setUser = (user: any): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): any => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("user") !== null;
};

export const AUTH_KEYS = {
  accessToken: "access_token-wiseMaestro",
  refreshToken: "refresh_token-wiseMaestro",
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(AUTH_KEYS.accessToken);
  return Boolean(token);
};


export const clearAuthStorage = () => {
  localStorage.removeItem(AUTH_KEYS.accessToken);
  localStorage.removeItem(AUTH_KEYS.refreshToken);
};
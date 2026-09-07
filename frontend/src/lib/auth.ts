const TOKEN_KEY = 'instabizweb_admin_token';

/**
 * Thin wrapper around localStorage for the admin JWT.
 * Centralised here so storage strategy (e.g. moving to cookies) only changes in one place.
 */
export const authStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

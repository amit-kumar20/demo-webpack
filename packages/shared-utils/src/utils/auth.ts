// Keeping empty exports to maintain module compatibility
// These functions are no longer used as we've switched to cookie-based auth
export const setLoggedIn = () => {};
export const clearLoggedIn = () => {};
export const shouldVerifyToken = () => false;
export const setAuthToken = (_token: string) => {};
export const getAuthToken = () => null;

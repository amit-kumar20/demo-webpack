export const AUTH_FLAGS = {
  IS_LOGGED_IN: 'isLoggedIn'
};

export const setLoggedIn = () => localStorage.setItem(AUTH_FLAGS.IS_LOGGED_IN, 'true');
export const clearLoggedIn = () => localStorage.removeItem(AUTH_FLAGS.IS_LOGGED_IN);
export const shouldVerifyToken = () => localStorage.getItem(AUTH_FLAGS.IS_LOGGED_IN) === 'true';

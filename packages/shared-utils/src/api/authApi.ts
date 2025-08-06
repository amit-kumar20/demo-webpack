import axios from 'axios';
const API_BASE_URL = 'http://localhost:5001';

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  full_name: string;
  role?: 'manager' | 'agent'; // Made optional since it's now defined on the backend
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    email: string;
    full_name: string;
    role: string;
  };
}

let authToken: string | null = null;

const authApi = {
  setAuthToken: (token: string | null) => {
    authToken = token;
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
    }
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/user/login', credentials);
    if (response.data.success && response.data.token) {
      authApi.setAuthToken(response.data.token);
    }
    return response.data;
  },

  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      authApi.setAuthToken(token);
    }
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/user/signup', data);
    return response.data;
  },

  verifyToken: async (): Promise<AuthResponse> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token available');
      }
      const response = await axiosInstance.get('/user/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      authApi.setAuthToken(null);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.get('/user/logout');
      // Clear auth token and headers
      authApi.setAuthToken(null);
    } catch (error: any) {
      // Still clear local auth state even if API call fails
      authApi.setAuthToken(null);
      throw error;
    }
  }
};

export default authApi;

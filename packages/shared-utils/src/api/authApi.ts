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
  role: 'manager' | 'agent';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    full_name: string;
    role: string;
  };
}

const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log('Login request:', credentials);
    const response = await axiosInstance.post('/user/login', credentials);
    console.log('Login response:', response.data);
    // Transform response to match our interface
    const authResponse: AuthResponse = {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data
    };
    return authResponse;
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    console.log('Signup request:', data);
    const response = await axiosInstance.post('/user/signup', data);
    console.log('Signup response:', response.data);
    return response.data;
  },

  verifyToken: async (): Promise<AuthResponse> => {
    console.log('Verify token request');
    try {
      const response = await axiosInstance.get('/user/verify');
      console.log('Verify token response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Verify token error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    console.log('Logout request');
    await axiosInstance.post('/user/logout', {});
    console.log('Logout successful');
  }
};

export default authApi;

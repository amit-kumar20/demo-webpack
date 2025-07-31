import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCustomToast from '../hooks/useCustomToast';
import { setUser } from '@shared-utils/store/authSlice';
import { isValidEmail, isValidPassword } from 'shared/utils';
import { Eye, EyeOff } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const SignUp: React.FC = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.email) {
      newErrors.push('Email is required');
    } else if (!isValidEmail(formData.email)) {
      newErrors.push('Invalid email format');
    }

    if (!formData.password) {
      newErrors.push('Password is required');
    } else if (!isValidPassword(formData.password)) {
      newErrors.push('Invalid password format');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }

    if (!formData.username) {
      newErrors.push('Username is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        email: formData.email,
        username: formData.username,
        password: formData.password // Note: In a real app, never store plain text passwords
      };

      localStorage.setItem(formData.email, JSON.stringify(userData));

      // Update Redux store with user data (excluding password)
      dispatch(setUser({
        email: formData.email,
        username: formData.username
      }));

      // Store current user (excluding password)
      localStorage.setItem('currentUser', JSON.stringify({
        email: formData.email,
        username: formData.username
      }));

      showSuccessToast('Account created successfully! Redirecting...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/');

      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
      });
    } catch (error: unknown) {
      showErrorToast('Failed to create account. Please try again.');
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowPassword((prev: boolean) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowConfirmPassword((prev: boolean) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.length > 0 && (
          <div className="text-red-500 text-sm space-y-1">
            {errors.map((error: string, index: number) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-600 text-sm"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="../signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

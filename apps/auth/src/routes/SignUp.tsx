import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCustomToast from '../hooks/useCustomToast';
import { isValidEmail, isValidPassword } from 'shared/utils';
import { Eye, EyeOff } from 'lucide-react';
import authApi from '@shared-utils/api/authApi';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  // role: 'manager' | 'agent'; // Commented out as role is now defined on the backend
}

const SignUp: React.FC = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    // role: 'agent' // Commented out as role is now defined on the backend
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

    if (!formData.full_name) {
      newErrors.push('Full name is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await authApi.signup({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        // role: formData.role // Commented out as role is now defined on the backend
      });

      if (response.success) {
        showSuccessToast('Account created successfully! Please sign in.');
        navigate('../signin', { replace: true });
      } else {
        throw new Error(response.message || 'Failed to create account');
      }
    } catch (error: unknown) {
      showErrorToast('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            id="full_name"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
        {/* Role selection commented out as it's now defined on the backend
        <div>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          >
            <option value="agent">Agent</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        */}
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCustomToast from '../hooks/useCustomToast';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const SignUp: React.FC = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('Invalid email format');
    }

    if (!formData.password) {
      newErrors.push('Password is required');
    } else if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters');
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

    if (!validateForm()) {
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for demo
      localStorage.setItem(formData.email, JSON.stringify(formData));
      
      showSuccessToast('Account created successfully!');
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
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
        {errors.length > 0 && (
          <div className="text-red-500 text-sm">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account? <Link to="../signin" className="text-blue-500 hover:underline">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;

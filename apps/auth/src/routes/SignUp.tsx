import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// @ts-ignore
const { isValidEmail, isValidPassword } = await import('shared/utils');

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  }>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const validateField = (name: string, value: string, formValues: typeof formData) => {
    const errors: string[] = [];
    
    switch (name) {
      case 'email':
        if (value && !isValidEmail(value)) {
          errors.push('Invalid email format');
        }
        break;
      
      case 'password':
        if (value && !isValidPassword(value)) {
          errors.push('Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number');
        }
        if (formValues.confirmPassword && value !== formValues.confirmPassword) {
          errors.push('Passwords do not match');
        }
        break;
      
      case 'confirmPassword':
        if (value && value !== formValues.password) {
          errors.push('Passwords do not match');
        }
        break;
    }
    
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      const newErrors = validateField(name, value, newData);
      setErrors(newErrors);
      return newData;
    });
  };

  const validateForm = () => {
    const emailErrors = validateField('email', formData.email, formData);
    const passwordErrors = validateField('password', formData.password, formData);
    const confirmErrors = validateField('confirmPassword', formData.confirmPassword, formData);
    
    const allErrors = [...emailErrors, ...passwordErrors, ...confirmErrors];
    setErrors(allErrors);
    return allErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!validateForm()) {
      return;
    }

    const existingUser = localStorage.getItem(formData.email);
    if (existingUser) {
      setErrors(['A user with this email already exists.']);
      return;
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.setItem(formData.email, JSON.stringify(formData));
      console.log('Sign up successful', formData);
      // Handle successful sign up (e.g., redirect to signin)
    } catch (err) {
      setErrors(['Failed to create account. Please try again.']);
      console.error('Sign up failed', err);
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
            autoComplete="username"
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
            autoComplete="email"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
        {errors.length > 0 && (
          <div className="text-red-500 text-sm">
            {errors.map((error: string, index: number) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm">
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

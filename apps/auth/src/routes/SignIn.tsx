import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCustomToast from '../hooks/useCustomToast';

// @ts-ignore
const { isValidEmail, isValidPassword } = await import('shared/utils');

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      showErrorToast('Invalid email format');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Invalid password format');
      showErrorToast('Invalid password format');
      return;
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const userData = localStorage.getItem(email);
      if (!userData) {
        throw new Error('User not found');
      }

      const user = JSON.parse(userData);
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Save user info in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Show success toast and wait for animation
      showSuccessToast('Sign in successful! Redirecting...');
      
      // Add a longer delay to ensure toast is visible
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to home
      navigate('/');

    } catch (err) {
      setError('Invalid email or password');
      showErrorToast('Invalid email or password');
      console.error('Sign in failed', err);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm">
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account? <Link to="../signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;

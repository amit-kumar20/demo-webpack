import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCustomToast from '../hooks/useCustomToast';
import { Eye, EyeOff } from 'lucide-react';
import { isValidEmail, isValidPassword } from 'shared/utils';
import { setUser } from '@shared-utils/store/authSlice';

const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      await new Promise(resolve => setTimeout(resolve, 500));

      const userData = localStorage.getItem(email);
      if (!userData) throw new Error('User not found');

      const user = JSON.parse(userData);
      if (user.password !== password) throw new Error('Invalid password');

      // Update Redux store with user data
      dispatch(setUser({ email: user.email, username: user.username }));
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      showSuccessToast('Sign in successful! Redirecting...');
      await new Promise(resolve => setTimeout(resolve, 1500));
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
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded text-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev: boolean) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-600 text-sm"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link to="../signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

import React from 'react';
import { useForm } from 'shared/hooks';
import { isValidEmail, isValidPassword } from 'shared/utils';

const FormValidationExample: React.FC = () => {
  const { values, errors, handleChange, setErrors } = useForm({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!isValidEmail(values.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!isValidPassword(values.password)) {
      newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid:', values);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Form Validation Example</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
            />
            {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-password"
            />
            {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
  );
};

export default FormValidationExample;

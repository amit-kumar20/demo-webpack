import React, { createContext, useContext } from 'react';

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const toastElement = document.createElement('div');
    toastElement.className = `fixed bottom-4 right-4 p-4 rounded-md shadow-lg text-white ${
      type === 'success' ? 'bg-green-500' :
      type === 'error' ? 'bg-red-500' :
      type === 'warning' ? 'bg-yellow-500' :
      'bg-blue-500'
    }`;
    toastElement.textContent = message;
    document.body.appendChild(toastElement);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toastElement.classList.add('opacity-0', 'transition-opacity');
      setTimeout(() => {
        document.body.removeChild(toastElement);
      }, 300);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return {
    showSuccessToast: (message: string) => context.showToast(message, 'success'),
    showErrorToast: (message: string) => context.showToast(message, 'error'),
    showInfoToast: (message: string) => context.showToast(message, 'info'),
    showWarningToast: (message: string) => context.showToast(message, 'warning'),
  };
};

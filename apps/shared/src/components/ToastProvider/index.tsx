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
    toastElement.style.cssText = `
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      padding: 1rem;
      border-radius: 0.375rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      color: white;
      background-color: ${
        type === 'success' ? '#10B981' :
        type === 'error' ? '#EF4444' :
        type === 'warning' ? '#F59E0B' :
        '#3B82F6'
      };
      z-index: 9999;
      transition: opacity 300ms ease-in-out;
    `;
    toastElement.textContent = message;
    document.body.appendChild(toastElement);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toastElement.style.opacity = '0';
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

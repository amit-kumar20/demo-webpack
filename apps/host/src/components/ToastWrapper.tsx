import React, { FC, PropsWithChildren, useState, useEffect } from 'react';

export const ToastWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [ToastProvider, setToastProvider] = useState<any>(null);

  useEffect(() => {
    const loadToastProvider = async () => {
      try {
        // @ts-ignore
        const module = await import('shared/components');
        setToastProvider(() => module.ToastProvider);

        // Set up the global showToast function
        window.showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
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
      } catch (error) {
        // Silently fail - loading indicator will show
      }
    };

    loadToastProvider();

    // Cleanup
    return () => {
      delete window.showToast;
    };
  }, []);

  if (!ToastProvider) {
    return <div>Loading Toast Provider...</div>;
  }

  return <ToastProvider>{children}</ToastProvider>;
};

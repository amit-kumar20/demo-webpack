import React, { FC, PropsWithChildren, useState, useEffect } from 'react';

export const ToastWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [ToastProvider, setToastProvider] = useState<any>(null);

  useEffect(() => {
    const loadToastProvider = async () => {
      try {
        // @ts-ignore
        const module = await import('shared/ToastProvider');
        setToastProvider(() => module.ToastProvider);
      } catch (error) {
        console.error('Failed to load ToastProvider:', error);
      }
    };

    loadToastProvider();
  }, []);

  if (!ToastProvider) {
    return <div>Loading Toast Provider...</div>;
  }

  return <ToastProvider>{children}</ToastProvider>;
};

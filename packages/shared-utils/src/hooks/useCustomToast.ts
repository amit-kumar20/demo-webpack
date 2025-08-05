import { useCallback } from 'react';

interface ToastHook {
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  showWarningToast: (message: string) => void;
}

export const useCustomToast = (): ToastHook => {
  const showSuccessToast = useCallback((message: string) => {
    console.log('Success:', message);
    // You can integrate with your preferred toast library here
  }, []);

  const showErrorToast = useCallback((message: string) => {
    console.log('Error:', message);
    // You can integrate with your preferred toast library here
  }, []);

  const showInfoToast = useCallback((message: string) => {
    console.log('Info:', message);
    // You can integrate with your preferred toast library here
  }, []);

  const showWarningToast = useCallback((message: string) => {
    console.log('Warning:', message);
    // You can integrate with your preferred toast library here
  }, []);

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast
  };
};

export default useCustomToast;

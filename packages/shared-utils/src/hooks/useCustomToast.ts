interface ToastHook {
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  showWarningToast: (message: string) => void;
}

// This function will be implemented in the actual app
declare global {
  interface Window {
    showToast?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  }
}

export const useCustomToast = (): ToastHook => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(message, type);
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  };

  return {
    showSuccessToast: (message: string) => showToast(message, 'success'),
    showErrorToast: (message: string) => showToast(message, 'error'),
    showInfoToast: (message: string) => showToast(message, 'info'),
    showWarningToast: (message: string) => showToast(message, 'warning'),
  };
};

export default useCustomToast;

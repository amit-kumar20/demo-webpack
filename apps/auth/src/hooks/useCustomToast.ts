type ToastType = 'success' | 'error' | 'info' | 'warning';

const useCustomToast = () => {
  const showToast = (message: string, type: ToastType) => {
    const toastElement = document.createElement('div');
    
    // Initial styles for animation
    toastElement.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      padding: 16px;
      border-radius: 6px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      color: white;
      z-index: 9999;
      transform: translateX(100%);
      transition: all 0.3s ease-in-out;
      opacity: 0;
    `;

    // Set background color based on type
    const bgColor = 
      type === 'success' ? '#10B981' :  // green-500
      type === 'error' ? '#EF4444' :    // red-500
      type === 'warning' ? '#F59E0B' :  // yellow-500
      '#3B82F6';                        // blue-500

    toastElement.style.backgroundColor = bgColor;
    toastElement.textContent = message;
    document.body.appendChild(toastElement);

    // Trigger animation
    requestAnimationFrame(() => {
      toastElement.style.transform = 'translateX(0)';
      toastElement.style.opacity = '1';
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      toastElement.style.transform = 'translateX(100%)';
      toastElement.style.opacity = '0';
      
      setTimeout(() => {
        if (document.body.contains(toastElement)) {
          document.body.removeChild(toastElement);
        }
      }, 300);
    }, 3000);
  };

  return {
    showSuccessToast: (message: string) => showToast(message, 'success'),
    showErrorToast: (message: string) => showToast(message, 'error'),
    showInfoToast: (message: string) => showToast(message, 'info'),
    showWarningToast: (message: string) => showToast(message, 'warning'),
  };
};

export default useCustomToast;

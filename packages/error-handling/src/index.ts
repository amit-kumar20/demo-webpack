export { ErrorBoundary } from './ErrorBoundary';
export {
  type ErrorWithCode,
  isErrorWithCode,
  getErrorMessage,
  createError,
  logError,
} from './errorUtils';

// Re-export React error types for convenience
export type { ErrorInfo } from 'react';

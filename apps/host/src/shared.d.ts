declare module 'shared/components' {
  import { Component, ErrorInfo, ReactNode } from 'react';
  
  interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode | ((error: Error) => ReactNode);
  }
  
  export class ErrorBoundary extends Component<ErrorBoundaryProps> {}
}

declare module 'shared/hooks' {
  export function useForm<T extends Record<string, any>>(initialValues: T): {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
  };
}

declare module 'shared/utils' {
  export function isValidEmail(email: string): boolean;
  export function isValidPassword(password: string): boolean;
}

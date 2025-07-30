# Shared App

## Description
This shared app is part of our microfrontend monorepo architecture. It provides common components, hooks, and utilities that can be used across different apps in the monorepo. This centralized approach promotes code reuse, ensures consistency, and simplifies maintenance.

## Installation
As this is part of a monorepo, no separate installation is required. Ensure you have installed all dependencies at the root of the monorepo using:

```bash
npm install
```

## Usage

### Components

#### ToastProvider
The ToastProvider component provides a context for managing toast notifications across the app.

```jsx
import { ToastProvider } from '@shared/components';

function App() {
  return (
    <ToastProvider>
      {/* Your app content */}
    </ToastProvider>
  );
}
```

#### ErrorBoundary
The ErrorBoundary component is used for handling and displaying errors gracefully.

```jsx
import { ErrorBoundary } from '@shared/components';

function MyComponent() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {/* Your component content */}
    </ErrorBoundary>
  );
}
```

#### Notification
The Notification component is used for displaying notifications.

```jsx
import { Notification } from '@shared/components';

function MyComponent() {
  return (
    <Notification message="This is a notification" type="info" />
  );
}
```

### Hooks

#### useForm
The useForm hook provides form handling functionality including managing form values and errors, and handling input changes.

```jsx
import { useForm } from '@shared/hooks';

function MyForm() {
  const { values, errors, handleChange, setErrors } = useForm({
    email: '',
    password: ''
  });

  // Use the form state and handlers in your component
}
```

#### useToast
The useToast hook provides an easy way to show toasts from any component.

```jsx
import { useToast } from '@shared/hooks';

function MyComponent() {
  const { showSuccessToast, showErrorToast } = useToast();

  const handleClick = () => {
    showSuccessToast('Operation successful!');
  };

  // Use the toast functions in your component
}
```

### Utilities

#### isValidEmail
Validates email addresses using a regex pattern.

```javascript
import { isValidEmail } from '@shared/utils';

const email = 'user@example.com';
if (isValidEmail(email)) {
  // Email is valid
}
```

#### isValidPassword
Checks if a password meets certain criteria (at least 8 characters, 1 uppercase, 1 lowercase, and 1 number).

```javascript
import { isValidPassword } from '@shared/utils';

const password = 'StrongP@ssw0rd';
if (isValidPassword(password)) {
  // Password is valid
}
```

## Contributing
1. Create a new branch for your feature or bug fix.
2. Make your changes and commit them with a clear commit message.
3. Push your changes to your branch.
4. Create a pull request with a description of your changes.

## Testing
(To be added once tests are implemented)

## License
(Add appropriate license information here)

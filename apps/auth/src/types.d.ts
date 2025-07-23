declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'react/jsx-runtime' {
  export default any;
}

declare module 'react-dom/client' {
  import { Root } from 'react-dom/client';
  export function createRoot(container: Element | null): Root;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

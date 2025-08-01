declare module 'shared/remoteStore' {
  import { Store } from '@reduxjs/toolkit';
  export const store: Store;
}

declare module 'shared/components' {
  export * from 'shared/src/components';
}

declare module 'shared/hooks' {
  export * from 'shared/src/hooks';
}

declare module 'shared/utils' {
  export * from 'shared/src/utils';
}

declare module 'shared/ToastProvider' {
  export * from 'shared/src/components/ToastProvider';
}

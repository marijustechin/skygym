import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from '@/app/providers/store';
import App from './App.tsx';
import '@/app/providers/i18n';
import '@/app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <Toaster />
      <App />
    </StoreProvider>
  </StrictMode>,
);

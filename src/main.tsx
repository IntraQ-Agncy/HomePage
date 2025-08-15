import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import SignupForm from './components/Form/SignupForm.tsx';
import './index.css';
import { ThemeContext, useThemeState } from './hooks/useTheme.ts';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/signup', element: <SignupForm /> }
]);

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  const themeState = useThemeState();
  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProviders>
      <RouterProvider router={router} />
    </RootProviders>
  </StrictMode>
);

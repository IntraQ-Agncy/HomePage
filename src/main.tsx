import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add error handling for the main render
const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    } else {
      console.error('Root element not found');
      document.body.innerHTML = '<div style="padding: 20px; text-align: center;">Root element not found. Please check the HTML structure.</div>';
    }
  } catch (error) {
    console.error('Failed to render app:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h1>Failed to load application</h1>
        <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
};

// Start the app
renderApp();

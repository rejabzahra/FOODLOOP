import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the app with ThemeProvider so the toggle affects the whole site */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

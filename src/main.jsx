import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App.jsx';

const theme = createTheme({
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  primaryColor: 'violet',
  defaultRadius: 'md',
  headings: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    fontWeight: '800',
  },
  colors: {
    dark: [
      '#C9D6F2',
      '#A7B7D9',
      '#8497BF',
      '#6379A4',
      '#495E84',
      '#334460',
      '#223048',
      '#172233',
      '#0E1726',
      '#09111C',
    ],
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>
);

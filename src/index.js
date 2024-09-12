import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import theme from './theme'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
  </React.StrictMode>
);

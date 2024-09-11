import React from 'react'
import theme from './theme'
import VeloCashbackCalculator from './components/VeloCashbackCalculator'
import { ChakraProvider } from '@chakra-ui/react';


const APP_VERSION = '4.0.1';

function App() {
  return (
      <ChakraProvider theme={theme}>
        <VeloCashbackCalculator appVersion={APP_VERSION} />
      </ChakraProvider>
  );
}

export default App;

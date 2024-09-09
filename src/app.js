import React from 'react'
import VeloCashbackCalculator from './components/VeloCashbackCalculator'
import { ChakraProvider } from '@chakra-ui/react';
function App() {
  return (
      <ChakraProvider>
        <VeloCashbackCalculator />
      </ChakraProvider>
  );
}

export default App;

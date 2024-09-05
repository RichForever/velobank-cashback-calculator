import React from 'react'
import CalcForm from './CalcForm'
import { ChakraProvider } from '@chakra-ui/react';
function VeloCashbackCalculator() {
  return (
      <ChakraProvider>
        <CalcForm />
      </ChakraProvider>
  );
}

export default VeloCashbackCalculator;

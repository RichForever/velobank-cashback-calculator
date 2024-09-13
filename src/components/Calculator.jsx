import React from 'react';
import { Box, Divider, VStack, useColorModeValue } from '@chakra-ui/react';
import CalculatorHeading from './CalculatorHeading';
import CalculatorDescription from './CalculatorDescription';
import CalculatorForm from './CalculatorForm';

const Calculator = () => {
  const dividerBorderColor = useColorModeValue('lightMode.border', 'darkMode.border');
  return (
    <Box width={{ base: '100%', lg: '50%' }} p={{ base: 6, lg: 8 }}>
      <VStack alignItems='stretch' gap='6'>
        <VStack gap='2' alignItems='stretch'>
          <CalculatorHeading />
          <CalculatorForm />
        </VStack>
        <Divider borderColor={dividerBorderColor} />
        <CalculatorDescription />
      </VStack>
    </Box>
  );
};
export default Calculator;

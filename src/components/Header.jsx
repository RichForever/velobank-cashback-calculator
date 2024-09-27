import React from 'react';

import { Heading, Text, useColorModeValue } from '@chakra-ui/react';

const Header = () => {
  const accentColor = useColorModeValue('lightMode.accent', 'darkMode.accent');

  return (
    <Heading mb='16' mt={{ base: 24, lg: 0 }} textAlign='center'>
      {/* prettier-ignore */}
      <Text display='inline-block' color={accentColor}>VeloBank</Text> Cashback Kalkulator
    </Heading>
  );
};
export default Header;

import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

// name that is used in component props variant="btnDefault"
const customButton = defineStyle({
  backgroundColor: 'lightMode.bgAccent',
  color: 'white',
  _hover: {
    backgroundColor: 'lightMode.bgAccentHover',
    _disabled: {
      backgroundColor: 'lightMode.bgAccent',
    },
  },
  _dark: {
    background: 'darkMode.bgAccent',
    color: '#0C1918',
    _hover: {
      backgroundColor: 'darkMode.bgAccentHover',
      _disabled: {
        backgroundColor: 'darkMode.bgAccent',
      },
    },
  },
});

const customButtonTheme = defineStyleConfig({
  variants: { customButton },
});

export { customButtonTheme };

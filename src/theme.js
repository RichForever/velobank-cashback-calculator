import { extendTheme } from '@chakra-ui/react';
import { customButtonTheme } from './theme/customButton';
import { customTooltipTheme } from './theme/customTooltip';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    alert: '#c53030',
    lightMode: {
      accent: '#00B13F',
      bgBody: '#E9E9E9',
      bgWrapperPrimary: '#FFFFFF',
      bgWrapperSecondary: '#F2F2F2',
      bgAccent: '#00B13F',
      bgAccentHover: '#0A7130',
      heading: '#1A202C',
      text: '#4E5B5B',
      textSecondary: '#454A50',
      border: '#D7D7D7',
      inputBorder: '#E2E8F0',
      iconButtonBg: 'white',
    },
    darkMode: {
      accent: '#4DFF8B',
      bgBody: '#0A1010',
      bgWrapperPrimary: '#0D1616',
      bgWrapperSecondary: '#111D1D',
      bgAccent: '#4DFF8B',
      bgAccentHover: '#AEFFCB',
      heading: '#868B8B',
      text: '#96A3A3',
      textSecondary: '#83B0B0',
      border: '#263131',
      inputBorder: '#263131',
      iconButtonBg: '#203737',
    },
  },
  components: {
    Button: customButtonTheme,
    Tooltip: customTooltipTheme,
  },
});
export default theme;

import { defineStyleConfig } from '@chakra-ui/react'

// define the base component styles
const baseStyle = {
    bg: 'white',
    color: 'lightMode.text',
    boxShadow: 'none',
    px: 3,
    py: 1.5,
    borderRadius: 6,
    _dark: {
        bg: 'darkMode.iconButtonBg',
        color: 'darkMode.bgAccent',
    }
}

// export the component theme
export const customTooltipTheme = defineStyleConfig({ baseStyle })
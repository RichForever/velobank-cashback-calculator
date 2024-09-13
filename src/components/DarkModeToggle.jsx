import React from 'react';
import { IconButton, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorModeToggleBg = useColorModeValue('lightMode.iconButtonBg', 'darkMode.iconButtonBg');
  const colorModeToggleBgHover = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
  const colorModeToggleColor = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
  const colorModeToggleColorHover = useColorModeValue('lightMode.iconButtonBg', 'darkMode.iconButtonBg');

  return (
    <Tooltip label={`Włącz tryb ${colorMode === 'light' ? 'ciemny' : 'jasny'}`} placement='bottom-start'>
      <IconButton
        bg={colorModeToggleBg}
        color={colorModeToggleColor}
        _hover={{
          bg: colorModeToggleBgHover,
          color: colorModeToggleColorHover,
        }}
        position='absolute'
        top={6}
        right={6}
        left='auto'
        size='sm'
        aria-label={`Włącz tryb ${colorMode === 'light' ? 'ciemny' : 'jasny'}`}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};
export default DarkModeToggle;

import React from 'react';
import { Flex, Heading, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useTransactionsContext } from '../context/TransactionsProvider';

const TransactionsHeading = () => {
  const { transactions, onOpen } = useTransactionsContext();

  // Show confirmation dialog to clear all transactions
  const handleClear = () => {
    onOpen();
  };

  const clearToggleBg = useColorModeValue('lightMode.iconButtonBg', 'darkMode.iconButtonBg');
  const clearToggleBgHover = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
  const clearToggleColor = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
  const clearToggleColorHover = useColorModeValue('lightMode.iconButtonBg', 'darkMode.iconButtonBg');
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Heading size='md'>Twoje transakcje</Heading>
      <Tooltip label='Wyczyść listę transakcji' placement='bottom-end'>
        <IconButton
          bg={clearToggleBg}
          color={clearToggleColor}
          _hover={{ bg: clearToggleBgHover, color: clearToggleColorHover }}
          size='sm'
          aria-label='Wyczyść listę transakcji'
          icon={<RepeatIcon />}
          onClick={handleClear}
          isDisabled={transactions.length === 0}
        />
      </Tooltip>
    </Flex>
  );
};
export default TransactionsHeading;

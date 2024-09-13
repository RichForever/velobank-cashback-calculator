import React, { useEffect } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { CASHBACK_MAX_VALUE } from '../constants';
import { useTransactionsContext } from '../context/TransactionsProvider';
import { useAppContext } from '../context/AppProvider';

const TransactionsSummary = () => {
  const { accumulatedCashback, remainingSpendLimit } = useTransactionsContext();
  const { showToast } = useAppContext();

  // Show a toast notification when cashback reaches the maximum value
  useEffect(() => {
    if (accumulatedCashback >= CASHBACK_MAX_VALUE) {
      showToast('cashback-success', 'Wygląda na to, że spełniłeś wszystkie warunki aby otrzymać pełną kwotę cashbacku.', 'success');
    }
  }, [accumulatedCashback, showToast]);

  const textColor = useColorModeValue('lightMode.textSecondary', 'darkMode.textSecondary');
  const cashbackValueColor = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
  return (
    <Box>
      <Flex justifyContent='space-between' fontWeight='bold' fontSize='lg' color={cashbackValueColor}>
        <Text>Twój cashback</Text>
        <Text>{accumulatedCashback.toFixed(2)} PLN</Text>
      </Flex>
      <Flex justifyContent='space-between' fontWeight='normal' fontSize='md' color={textColor}>
        <Text>Do wydania zostało</Text>
        <Text>{remainingSpendLimit.toFixed(2)} PLN</Text>
      </Flex>
    </Box>
  );
};
export default TransactionsSummary;

import React, { useEffect } from 'react';
import {Flex, VStack, IconButton, Text, Tooltip, useColorModeValue, Box, HStack} from '@chakra-ui/react';
import {DeleteIcon, DragHandleIcon} from '@chakra-ui/icons';
import { LOCALSTORAGE_KEY } from '../constants';
import { useTransactionsContext } from '../context/TransactionsProvider';
import { useValidObjectStructure } from '../hooks/useValidObjectStructure';
import { useAppContext } from '../context/AppProvider';
import {Reorder} from "framer-motion";

const TransactionsList = () => {
  const { setTransactions, transactions, setSelectedPayment, onDeleteOpen } = useTransactionsContext();
  const { showToast, clearAllTransactions } = useAppContext();
  const hasValidObjectStructure = useValidObjectStructure();

  // Prompt user to confirm deletion of a transaction
  const promptDeleteTransaction = (payment) => {
    setSelectedPayment(payment);
    onDeleteOpen();
  };

  // Check localStorage data structure on mount
  useEffect(() => {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (!hasValidObjectStructure(parsedData)) {
        // If the structure is invalid, clear all transactions
        clearAllTransactions();
        showToast('storage-reset', 'Dane zapisane w pamięci podręcznej zostały zresetowane z powodu zmian w strukturze.', 'warning');
      }
    }
  }, [hasValidObjectStructure, clearAllTransactions]);

  const textColor = useColorModeValue('lightMode.textSecondary', 'darkMode.textSecondary');
  const cashbackValueColor = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
  const draggableIconColor = useColorModeValue('lightMode.border', 'darkMode.border');

  const dragVariants = {
    initial: {
      zIndex: 0,
      opacity: "100%"
    },
    dragging: {
      zIndex: 1,
      opacity: "25%"
    },
  };

  return (
    <Flex height='100%' alignItems={transactions.length > 0 ? 'flex-start' : 'center'} justifyContent='center' flex='1' overflowY='auto'>
      {transactions.length > 0 ? (
        <>
          <VStack spacing={4} align='stretch' width='100%' as={Reorder.Group} axis='y' onReorder={setTransactions} values={transactions}>
            {transactions.map((transaction) => (
              <Flex alignItems='center' justifyContent='space-between' gap={4} key={transaction.id} as={Reorder.Item} value={transaction} variants={dragVariants} initial="initial" whileDrag="dragging" position="relative">
                <HStack gap={4}>
                  <DragHandleIcon color={draggableIconColor} cursor="move" />
                  <Box>
                    <Text fontSize='lg' fontWeight='700'>
                      {transaction.value.toFixed(2)} PLN
                    </Text>
                    <Text fontSize='sm' color={cashbackValueColor} fontWeight='600'>
                      {transaction.cashback.toFixed(2)} PLN
                    </Text>
                  </Box>
                </HStack>
                <Flex gap={4} align='stretch'>
                  <Tooltip label='Usuń transakcję' placement='bottom-end'>
                    <IconButton aria-label='Usuń transakcję' icon={<DeleteIcon />} colorScheme='red' size='sm' onClick={() => promptDeleteTransaction(transaction)} />
                  </Tooltip>
                </Flex>
              </Flex>
            ))}
          </VStack>
        </>
      ) : (
        <Text color={textColor}>Brak transakcji do wyświetlenia</Text>
      )}
    </Flex>
  );
};
export default TransactionsList;

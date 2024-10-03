import React, { useEffect } from 'react';

import { Reorder } from 'framer-motion';
import { Flex, VStack, Text, useColorModeValue, Divider } from '@chakra-ui/react';

import { LOCALSTORAGE_KEY } from '../constants';
import { useTransactionsContext } from '../context/TransactionsProvider';
import { useAppContext } from '../context/AppProvider';
import { useValidObjectStructure } from '../hooks/useValidObjectStructure';
import TransactionsListItem from './TransactionsListItem';


const TransactionsList = () => {
  const { setTransactions, transactions, setSelectedPayment, onDeleteOpen } = useTransactionsContext();
  const { showToast, clearAllTransactions } = useAppContext();
  const hasValidObjectStructure = useValidObjectStructure();

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
  const dividerColor = useColorModeValue('lightMode.border', 'darkMode.border')

  const handleDeleteTransaction = (transaction) => {
    setSelectedPayment(transaction);
    onDeleteOpen();
  };

  return (
    <Flex height='100%' alignItems={transactions.length > 0 ? 'flex-start' : 'center'} justifyContent='center' flex='1' overflowY='auto'>
      {transactions.length > 0 ? (
        <>

          <VStack style={{ overflow: 'hidden' }} spacing={4} align='stretch' width='100%' as={Reorder.Group} axis='y' onReorder={setTransactions} values={transactions} divider={<Divider borderColor={dividerColor} />}>
            {transactions.map((transaction) => (
                <TransactionsListItem key={transaction.id} transaction={transaction} onDelete={handleDeleteTransaction} />
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

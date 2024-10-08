import React, { useRef } from 'react';

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useColorModeValue } from '@chakra-ui/react';

import { useAlertsContext } from '../context/AlertsProvider';
import { useAppContext } from '../context/AppProvider';
import { useCurrentDate } from '../hooks/useCurrentDate';

const DeleteTransactionAlert = () => {
  const { isDeleteOpen, onDeleteClose } = useAlertsContext();
  const { inputRef, isSmallScreen, selectedPayment, setSelectedPayment, setAccumulatedCashback, setRemainingSpendLimit, transactions, setTransactions, showToast, setLastOperationDate } = useAppContext();
  const cancelRef = useRef();
  const currentDate = useCurrentDate();
  // Function to delete a transaction
  const deleteTransaction = () => {
    const { id, cashback, value } = selectedPayment;
    const updatedTransactions = transactions.filter((payment) => payment.id !== id);


    setTransactions(updatedTransactions);

    // Adjust accumulated cashback and remaining spend limit
    setAccumulatedCashback((prevAccumulatedCashback) => parseFloat((prevAccumulatedCashback - cashback).toFixed(2)));
    setRemainingSpendLimit((prevRemainingSpendLimit) => parseFloat((prevRemainingSpendLimit + parseFloat(value)).toFixed(2)));

    setSelectedPayment(null);

    onDeleteClose();

    // Show toast notification for deleted transaction
    showToast('item-deleted-success', 'Pozycja usunięta', 'info');

    // Update operation date
    setLastOperationDate(currentDate)

    // Refocus input field if not on small screen
    if (!isSmallScreen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const bg = useColorModeValue('white', 'darkMode.bgWrapperPrimary');
  const textColor = useColorModeValue('lightMode.textSecondary', 'darkMode.textSecondary');

  return (
    <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose} isCentered={true}>
      <AlertDialogOverlay>
        <AlertDialogContent margin={{ base: '0 1rem', lg: '' }} bg={bg}>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Usunąć transakcję?
          </AlertDialogHeader>
          <AlertDialogBody fontWeight='600' color={textColor}>
            Czy na pewno chcesz usunąć tę transakcję? Tej operacji nie można cofnąć.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteClose} fontWeight='700'>
              Anuluj
            </Button>
            <Button colorScheme='red' onClick={deleteTransaction} ml={3} fontWeight='700'>
              Usuń
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default DeleteTransactionAlert;

import React, { useRef } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useColorModeValue } from '@chakra-ui/react';
import { useAlertsContext } from '../context/AlertsProvider';
import { useAppContext } from '../context/AppProvider';

const DeleteTransactionAlert = () => {
  const { isDeleteOpen, onDeleteClose } = useAlertsContext();
  const { inputRef, isSmallScreen, selectedPayment, setSelectedPayment, setAccumulatedCashback, setRemainingSpendLimit, transactions, setTransactions, showToast } = useAppContext();
  const cancelRef = useRef();

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

    // Refocus input field if not on small screen
    if (!isSmallScreen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const bg = useColorModeValue('white', 'darkMode.bgWrapperPrimary');

  return (
    <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose} isCentered={true}>
      <AlertDialogOverlay>
        <AlertDialogContent margin={{ base: '0 1rem', lg: '' }} bg={bg}>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Usunąć transakcję?
          </AlertDialogHeader>
          <AlertDialogBody>Czy na pewno chcesz usunąć tę transakcję? Tej operacji nie można cofnąć.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteClose}>
              Anuluj
            </Button>
            <Button colorScheme='red' onClick={deleteTransaction} ml={3}>
              Usuń
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default DeleteTransactionAlert;

import React, { useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react';
import { CASHBACK_PERCENTAGE_VALUE } from '../constants';
import { useCalculatorContext } from '../context/CalculatorProvider';
import { useAppContext } from '../context/AppProvider';
import { useCurrentDate } from '../hooks/useCurrentDate';

const CalculatorForm = () => {
  const { setTransactions, transactions, accumulatedCashback, setAccumulatedCashback, errorAlertRef, remainingSpendLimit, setRemainingSpendLimit, transactionAmount, setTransactionAmount, formError, setFormError, setLastOperationDate } =
    useCalculatorContext();
  const { showToast, isSmallScreen, inputRef } = useAppContext();
  const currentDate = useCurrentDate();

  // Function to add a new transaction
  const addTransaction = () => {
    const transactionInputValue = parseFloat(transactionAmount);

    // Validate transaction amount
    if (!transactionAmount || isNaN(transactionInputValue) || transactionInputValue === 0) {
      setFormError(true);
      return;
    }

    // Calculate cashback for the transaction
    let calculatedCashback = parseFloat((transactionInputValue * CASHBACK_PERCENTAGE_VALUE).toFixed(2));
    let parsedTransactionValue = parseFloat(transactionInputValue.toFixed(2));

    // Update transactions state with the new transaction
    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        value: parsedTransactionValue,
        cashback: calculatedCashback,
      },
    ]);

    // Update accumulated cashback and remaining spend limit
    let updatedAccumulatedCashback = parseFloat((accumulatedCashback + calculatedCashback).toFixed(2));
    setAccumulatedCashback(updatedAccumulatedCashback);

    let updatedRemainingSpendLimit = parseFloat((remainingSpendLimit - transactionInputValue).toFixed(2));
    setRemainingSpendLimit(updatedRemainingSpendLimit);

    // Show toast notification for added transaction
    showToast('item-added-success', 'Transakcja dodana', 'info');

    // Clear transaction input field
    setTransactionAmount('');

    // Refocus input field if not on small screen
    if (!isSmallScreen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle Enter key press to add transaction
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTransaction();
    }
    if (parseFloat(e.currentTarget.value) === 0) {
      inputRef.current.value = '';
      setFormError(true);
    }
  };

  const handleOnChange = (e) => {
    setTransactionAmount(e.target.value);
    setFormError(false);
  };

  // Scroll to error alert on small screens if there's an input error
  useEffect(() => {
    if (isSmallScreen && errorAlertRef.current) {
      errorAlertRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [formError, isSmallScreen]);

  // Reset input error when transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      setFormError(false);
    }

    // Set the last operation date
    setLastOperationDate(currentDate);
  }, [currentDate, transactions]);

  const inputBorderColor = useColorModeValue('lightMode.inputBorder', 'darkMode.inputBorder');
  const inputLabelColor = useColorModeValue('lightMode.text', 'darkMode.text');
  return (
    <Box>
      <FormControl id='transaction-value' my='3'>
        <FormLabel fontSize='sm' color={inputLabelColor}>
          Wartość transakcji
        </FormLabel>
        <Input
          type='number'
          value={transactionAmount || ''}
          step='0.01'
          onChange={handleOnChange}
          onBlur={() => setTransactionAmount(parseFloat(transactionAmount).toFixed(2))}
          onKeyDown={handleKeyDown}
          isInvalid={formError}
          ref={inputRef}
          borderColor={inputBorderColor}
          placeholder={'Wpisz wartość transakcji, np. 1.50'}
        />
      </FormControl>
      <Button variant='customButton' width='100%' onClick={addTransaction} isDisabled={!transactionAmount || isNaN(Number(transactionAmount)) || formError}>
        Dodaj transakcję
      </Button>
    </Box>
  );
};
export default CalculatorForm;

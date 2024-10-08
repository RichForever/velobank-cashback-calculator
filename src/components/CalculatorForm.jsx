import React, { useEffect, useState } from 'react';

import { Box, Button, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

import { CASHBACK_PERCENTAGE_VALUE } from '../constants';
import { useCalculatorContext } from '../context/CalculatorProvider';
import { useAppContext } from '../context/AppProvider';
import { useCurrentDate } from '../hooks/useCurrentDate';

const CalculatorForm = () => {
  const { setTransactions, transactions, accumulatedCashback, setAccumulatedCashback, errorAlertRef, remainingSpendLimit, setRemainingSpendLimit, transactionAmount, setTransactionAmount, formError, setFormError } =
    useCalculatorContext();
  const { showToast, isSmallScreen, inputRef, setLastOperationDate } = useAppContext();
  const currentDate = useCurrentDate();

  const [showClear, setShowClear] = useState(false);

  // Function to add a new transaction
  const addTransaction = () => {
    const transactionInputValue = parseFloat(transactionAmount);

    // Validate transaction amount
    if (!transactionAmount || isNaN(transactionInputValue) || transactionInputValue <= 0) {
      setFormError(true);
      setLastOperationDate(currentDate)
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
        date: currentDate()
      },
    ]);

    // Update accumulated cashback and remaining spend limit
    let updatedAccumulatedCashback = parseFloat((accumulatedCashback + calculatedCashback).toFixed(2));
    setAccumulatedCashback(updatedAccumulatedCashback);

    let updatedRemainingSpendLimit = parseFloat((remainingSpendLimit - transactionInputValue).toFixed(2));
    setRemainingSpendLimit(updatedRemainingSpendLimit);

    // Show toast notification for added transaction
    showToast('item-added-success', 'Transakcja dodana', 'info');

    // Update operation date
    setLastOperationDate(currentDate)

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

  const handleValueClearOnClick = () => {
    setTransactionAmount('');
    setFormError(false);
    setShowClear(false)
  };

  useEffect(() => {
    if(transactionAmount > 0 && !formError) {
      setShowClear(true)
    }
    return () => {
      setShowClear(false)
    }
  }, [transactionAmount, formError]);

  // Scroll to error alert on small screens if there's an input error
  useEffect(() => {
    if (isSmallScreen && errorAlertRef.current) {
      errorAlertRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [formError, isSmallScreen, errorAlertRef]);

  // Reset input error when transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      setFormError(false);
    }
  }, [transactions, setFormError]);

  const inputBorderColor = useColorModeValue('lightMode.inputBorder', 'darkMode.inputBorder');
  const inputLabelColor = useColorModeValue('lightMode.text', 'darkMode.text');
  const clearToggleBg = useColorModeValue('lightMode.iconButtonBg', 'darkMode.iconButtonBg');
  const clearToggleBgHover = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
  const clearToggleColor = useColorModeValue('lightMode.bgAccent', 'darkMode.bgAccent');
  const clearToggleColorHover = useColorModeValue('lightMode.iconButtonBg', 'darkMode.iconButtonBg');

  return (
    <Box>
      <FormControl id='transaction-value' my='3'>
        <FormLabel fontSize='sm' color={inputLabelColor} fontWeight='600'>
          Wartość transakcji
        </FormLabel>
        <InputGroup>
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
          {showClear && (
            <InputRightElement>
              <Tooltip label='Wyczyść pole' placement='bottom-end'>
                <IconButton
                  bg={clearToggleBg}
                  color={clearToggleColor}
                  _hover={{ bg: clearToggleBgHover, color: clearToggleColorHover }}
                  size='xs'
                  aria-label='Wyczyść'
                  icon={<SmallCloseIcon />}
                  isDisabled={formError}
                  onClick={handleValueClearOnClick}
                />
              </Tooltip>
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
      <Button variant='customButton' width='100%' onClick={addTransaction} isDisabled={!transactionAmount || isNaN(Number(transactionAmount)) || formError}>
        Dodaj transakcję
      </Button>
    </Box>
  );
};
export default CalculatorForm;

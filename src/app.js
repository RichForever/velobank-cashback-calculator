import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, useBreakpointValue, useColorModeValue, useDisclosure } from '@chakra-ui/react';

import Calculator from './components/Calculator';
import Transactions from './components/Transactions';
import Alerts from './components/Alerts';

import Footer from './components/Footer';
import Header from './components/Header';

import DarkModeToggle from './components/DarkModeToggle';
import ErrorAlert from './components/ErrorAlert';

import useToastNotification from './hooks/useShowToast';

import { CalculatorContext } from './context/CalculatorProvider';
import { TransactionsContext } from './context/TransactionsProvider';
import { AlertsContext } from './context/AlertsProvider';
import { AppContext } from './context/AppProvider';

import { LOCALSTORAGE_KEY, CASHBACK_MAX_SPEND_VALUE } from './constants';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    return savedData ? JSON.parse(savedData).transactions : [];
  });

  const [accumulatedCashback, setAccumulatedCashback] = useState(() => {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    return savedData ? JSON.parse(savedData).accumulatedCashback : 0;
  });

  const [remainingSpendLimit, setRemainingSpendLimit] = useState(() => {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    return savedData ? JSON.parse(savedData).remainingSpendLimit : CASHBACK_MAX_SPEND_VALUE;
  });

  const [lastOperationDate, setLastOperationDate] = useState(() => {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    return savedData ? JSON.parse(savedData).lastOperationDate : null;
  });

  const [selectedPayment, setSelectedPayment] = useState(null); // Selected transaction for deletion
  const [transactionAmount, setTransactionAmount] = useState(''); // Current transaction amount input
  const [formError, setFormError] = useState(false); // Error state for invalid input
  const inputRef = useRef(null); // Ref for the input element
  const errorAlertRef = useRef(null); // Ref for error alert

  const { isOpen, onOpen, onClose } = useDisclosure(); // Disclosure for clear confirmation dialog
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure(); // Disclosure for delete confirmation dialog

  const { showToast } = useToastNotification();
  const isSmallScreen = useBreakpointValue({ base: true, lg: false }); // Responsive design breakpoint

  // Function to clear all transactions
  const clearAllTransactions = () => {
    setTransactions([]);
    setTransactionAmount('');
    setFormError(false);
    setAccumulatedCashback(0);
    setRemainingSpendLimit(CASHBACK_MAX_SPEND_VALUE);

    onClose();
    showToast('clear-success', 'Lista wydatków została wyczyszczona.', 'info');

    if (isSmallScreen && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Save current data to localStorage when relevant state changes
  useEffect(() => {
    const data = {
      lastOperationDate,
      accumulatedCashback,
      remainingSpendLimit,
      transactions,
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  }, [lastOperationDate, accumulatedCashback, remainingSpendLimit, transactions]);

  const mainBg = useColorModeValue('lightMode.bgBody', 'darkMode.bgBody');
  const wrapperBg = useColorModeValue('white', 'darkMode.bgWrapperPrimary');

  return (
    <>
      <AppContext.Provider
        value={{
          accumulatedCashback,
          setAccumulatedCashback,
          clearAllTransactions,
          inputRef,
          isSmallScreen,
          onClose,
          onOpen,
          onDeleteClose,
          onDeleteOpen,
          remainingSpendLimit,
          setRemainingSpendLimit,
          selectedPayment,
          setSelectedPayment,
          setFormError,
          setTransactionAmount,
          transactions,
          setTransactions,
          showToast,
        }}>
        <DarkModeToggle />
        <Flex width='100%' minHeight='100vh' alignItems='center' justifyContent='center' bg={mainBg} padding={6} direction='column'>
          <Header />
          <Box width='100%' maxWidth='1000px'>
            {formError && <ErrorAlert errorAlertRef={errorAlertRef} setFormError={setFormError} />}
            <Flex
              bg={wrapperBg}
              borderRadius={8}
              boxShadow='xl'
              justifyContent='space-between'
              gap={{ base: '6', lg: '0' }}
              maxHeight={{ base: '100%', lg: '600px' }}
              height={{ base: '100%', lg: '600px' }}
              direction={{ base: 'column', lg: 'row' }}>
              <CalculatorContext.Provider
                value={{
                  accumulatedCashback,
                  setAccumulatedCashback,
                  errorAlertRef,
                  formError,
                  setFormError,
                  setLastOperationDate,
                  remainingSpendLimit,
                  setRemainingSpendLimit,
                  transactionAmount,
                  setTransactionAmount,
                  transactions,
                  setTransactions,
                }}>
                <Calculator />
              </CalculatorContext.Provider>
              <TransactionsContext.Provider
                value={{
                  accumulatedCashback,
                  onDeleteOpen,
                  onOpen,
                  remainingSpendLimit,
                  setSelectedPayment,
                  transactions,
                }}>
                <Transactions />
              </TransactionsContext.Provider>
            </Flex>
            <Footer lastOperationDate={lastOperationDate} />
          </Box>
        </Flex>
        <AlertsContext.Provider value={{ isOpen, onClose, isDeleteOpen, onDeleteClose }}>
          <Alerts />
        </AlertsContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;

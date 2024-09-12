import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, useBreakpointValue, useColorModeValue, useDisclosure } from '@chakra-ui/react';

import Calculator from './components/Calculator';
import Transactions from "./components/Transactions";
import Alerts from "./components/Alerts";

import Footer from './components/Footer';
import Header from './components/Header';

import DarkModeToggle from "./components/DarkModeToggle";
import ErrorAlert from "./components/ErrorAlert";

import { CalculatorContext } from "./context/CalculatorProvider";
import { TransactionsContext } from "./context/TransactionsProvider";
import { AlertsContext } from "./context/AlertsProvider";

import { useCurrentDate } from "./hooks/useCurrentDate";
import { useValidObjectStructure } from "./hooks/useValidObjectStructure";
import useToastNotification from "./hooks/useShowToast";

import { CASHBACK_MAX_VALUE, LOCALSTORAGE_KEY, CASHBACK_PERCENTAGE_VALUE, CASHBACK_MAX_SPEND_VALUE } from './constants'
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

    const {isOpen, onOpen, onClose} = useDisclosure(); // Disclosure for clear confirmation dialog
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure(); // Disclosure for delete confirmation dialog

    const { showToast } = useToastNotification();
    const isSmallScreen = useBreakpointValue({base: true, lg: false}); // Responsive design breakpoint
    const currentDate = useCurrentDate();
    const hasValidObjectStructure = useValidObjectStructure();

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
        setTransactions([...transactions, {
            id: Date.now(),
            value: parsedTransactionValue,
            cashback: calculatedCashback,
        }]);

        // Update accumulated cashback and remaining spend limit
        let updatedAccumulatedCashback = parseFloat((accumulatedCashback + calculatedCashback).toFixed(2));
        setAccumulatedCashback(updatedAccumulatedCashback);

        let updatedRemainingSpendLimit = parseFloat((remainingSpendLimit - transactionInputValue).toFixed(2));
        setRemainingSpendLimit(updatedRemainingSpendLimit);

        // Show toast notification for added transaction
        showToast('item-added-success', "Transakcja dodana", "info")

        // Clear transaction input field
        setTransactionAmount('');

        // Refocus input field if not on small screen
        if (!isSmallScreen && inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Prompt user to confirm deletion of a transaction
    const promptDeleteTransaction = (payment) => {
        setSelectedPayment(payment);
        onDeleteOpen();
    };

    // Function to delete a transaction
    const deleteTransaction = () => {
        const { id, cashback, value } = selectedPayment;
        const updatedTransactions = transactions.filter((payment) => payment.id !== id)

        setTransactions(updatedTransactions);

        // Adjust accumulated cashback and remaining spend limit
        setAccumulatedCashback((prevAccumulatedCashback) => parseFloat((prevAccumulatedCashback - cashback).toFixed(2)));
        setRemainingSpendLimit((prevRemainingSpendLimit) => parseFloat((prevRemainingSpendLimit + parseFloat(value)).toFixed(2)));

        setSelectedPayment(null);

        onDeleteClose();

        // Show toast notification for deleted transaction
        showToast("item-deleted-success", "Pozycja usunięta", "info");

        // Refocus input field if not on small screen
        if (!isSmallScreen && inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Show confirmation dialog to clear all transactions
    const handleClear = () => {
        onOpen();
    };

    // Function to clear all transactions
    const clearAllTransactions = () => {
        setTransactions([]);
        setTransactionAmount('');
        setFormError(false);
        setAccumulatedCashback(0);
        setRemainingSpendLimit(CASHBACK_MAX_SPEND_VALUE);

        onClose();
        showToast("clear-success", "Lista wydatków została wyczyszczona.", "info")

        if (isSmallScreen && inputRef.current) {
            inputRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }

    };

    // Check localStorage data structure on mount
    useEffect(() => {
        const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (!hasValidObjectStructure(parsedData)) {
                // If the structure is invalid, clear all transactions
                clearAllTransactions();
                showToast("storage-reset", "Dane zapisane w pamięci podręcznej zostały zresetowane z powodu zmian w strukturze.", "warning");
            }
        }
    }, [hasValidObjectStructure, clearAllTransactions]);

    // Scroll to error alert on small screens if there's an input error
    useEffect(() => {
        if (isSmallScreen && errorAlertRef.current) {
            errorAlertRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [formError, isSmallScreen])

    // Reset input error when transactions change
    useEffect(() => {
        if (transactions.length > 0) {
            setFormError(false);
        }

        // Set the last operation date
        setLastOperationDate(currentDate);

    }, [currentDate, transactions]);

    // Show a toast notification when cashback reaches the maximum value
    useEffect(() => {
        if (accumulatedCashback >= CASHBACK_MAX_VALUE) {
            showToast("cashback-success", "Wygląda na to, że spełniłeś wszystkie warunki aby otrzymać pełną kwotę cashbacku.", "success")
        }
    }, [accumulatedCashback, showToast])

    // Save current data to localStorage when relevant state changes
    useEffect(() => {
        const data = { lastOperationDate, accumulatedCashback, remainingSpendLimit, transactions };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
    }, [lastOperationDate, accumulatedCashback, remainingSpendLimit, transactions ]);

    const mainBg = useColorModeValue('lightMode.bgBody', 'darkMode.bgBody')
    const wrapperBg = useColorModeValue('white', 'darkMode.bgWrapperPrimary')

  return (
      <>
          <DarkModeToggle />
          <Flex width="100%" minHeight="100vh" alignItems="center" justifyContent="center" bg={mainBg} padding={6} direction="column">
              <Header />
              <Box width="100%" maxWidth="1000px">
                  {formError && <ErrorAlert errorAlertRef={errorAlertRef} setFormError={setFormError} />}
                  <Flex bg={wrapperBg} borderRadius={8} boxShadow="xl" justifyContent="space-between" gap={{ base: '6', lg: '' }} maxHeight={{ base: '100%', lg: '600px' }} height={{ base: '100%', lg: '600px' }} direction={{ base: 'column', lg: 'row' }}>
                      <CalculatorContext.Provider value={{ transactionAmount, setTransactionAmount, formError, inputRef, addTransaction }}>
                          <Calculator />
                      </CalculatorContext.Provider>
                      <TransactionsContext.Provider value={{ handleClear, transactions, promptDeleteTransaction, accumulatedCashback, remainingSpendLimit }}>
                          <Transactions />
                      </TransactionsContext.Provider>
                  </Flex>
                  <Footer lastOperationDate={lastOperationDate} />
              </Box>
          </Flex>
          <AlertsContext.Provider value={{ isOpen, onClose, clearAllTransactions, isDeleteOpen, onDeleteClose, deleteTransaction }}>
              <Alerts />
          </AlertsContext.Provider>
      </>
  );
}

export default App;

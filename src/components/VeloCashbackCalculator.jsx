import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Flex, useBreakpointValue, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import Calculator from './Calculator/Calculator';
import { CalculatorProvider } from "./Calculator/CalculatorContext";
import Transactions from "./Transactions/Transactions";
import { TransactionsProvider } from "./Transactions/TransactionsContext";
import Footer from './Footer';
import Header from './Header';
import ErrorAlert from "./ErrorAlert";
import ClearAllTransactionsAlert from "./Alerts/ClearAllTransactionsAlert";
import DeleteTransactionAlert from "./Alerts/DeleteTransactionAlert";
import DarkModeToggle from "./DarkModeToggle";

// Constants defining cashback rules and local storage key
const CASHBACK_PERCENTAGE_VALUE = 0.05;
const CASHBACK_MAX_VALUE = 60.00;
const CASHBACK_MAX_SPEND_VALUE = 1200.00;
const LOCALSTORAGE_KEY = 'velobankCashbackCalculatorData'

// Expected structure for localstorage data with just the key names (no type checking)
const expectedLocalStorageShape = {
    lastOperationDate: "",
    accumulatedCashback: "",
    remainingSpendLimit: "",
    transactions: ""
};

// Helper function to check if the structure is valid (only keys)
const hasValidStructure = (data, expectedShape) => {
    const actualKeys = Object.keys(data);
    const expectedKeys = Object.keys(expectedShape);
    // Check if every expected key exists in the actual data
    return expectedKeys.every(key => actualKeys.includes(key));
};

function VeloCashbackCalculator({ appVersion }) {

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
    const [inputError, setInputError] = useState(false); // Error state for invalid input
    const inputRef = useRef(null); // Ref for the input element
    const errorAlertRef = useRef(null); // Ref for error alert

    const {isOpen, onOpen, onClose} = useDisclosure(); // Disclosure for clear confirmation dialog
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure(); // Disclosure for delete confirmation dialog

    const toast = useToast(); // Toast notifications for user feedback
    const isSmallScreen = useBreakpointValue({base: true, lg: false}); // Responsive design breakpoint

    // Function to add a new transaction
    const addTransaction = () => {
        const transactionInputValue = parseFloat(transactionAmount);

        // Validate transaction amount
        if (!transactionAmount || isNaN(transactionInputValue) || transactionInputValue === 0) {
            setInputError(true);
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

        // Set the last operation date
        setLastOperationDate(new Date().toLocaleString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }));

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

        // Update the last operation date
        setLastOperationDate(new Date().toLocaleString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }));

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
        setInputError(false);
        setAccumulatedCashback(0);
        setRemainingSpendLimit(CASHBACK_MAX_SPEND_VALUE);

        setLastOperationDate(new Date().toLocaleString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }));

        onClose();
        showToast("clear-success", "Lista wydatków została wyczyszczona.", "info")

        if (isSmallScreen && inputRef.current) {
            inputRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }

    };

    // Function to show toast notifications
    const showToast = useCallback((id, message, type = 'success') => {
        if (!toast.isActive(id)) {
            toast({
                id,
                description: message,
                status: type,
                duration: 3000,
                isClosable: false,
                variant: 'subtle',
                position: 'bottom-right',
            })
        }
    }, [toast])

    // Handle Enter key press to add transaction
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTransaction();
        }
    };

    // Check localStorage data structure on mount
    useEffect(() => {
        const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (!hasValidStructure(parsedData, expectedLocalStorageShape)) {
                // If the structure is invalid, clear all transactions
                clearAllTransactions();
                showToast("storage-reset", "Dane zapisane w pamięci podręcznej zostały zresetowane z powodu zmian w strukturze.", "warning");
            }
        }
    }, []);

    // Scroll to error alert on small screens if there's an input error
    useEffect(() => {
        if (isSmallScreen && errorAlertRef.current) {
            errorAlertRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [inputError, isSmallScreen])

    // Reset input error when transactions change
    useEffect(() => {
        if (transactions.length > 0) {
            setInputError(false);
        }
    }, [transactions]);

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

    // Render the component UI
    return (<>
        <DarkModeToggle />
        <Flex width="100%" minHeight="100vh" alignItems="center" justifyContent="center" bg={mainBg} padding={6} direction="column">
            <Header />
            <Box width="100%" maxWidth="1000px">
                {inputError && <ErrorAlert errorAlertRef={errorAlertRef} setInputError={setInputError} />}
                <Flex bg={wrapperBg} borderRadius={8} boxShadow="xl" justifyContent="space-between" gap={{ base: '6', lg: '' }} maxHeight={{ base: '100%', lg: '600px' }} height={{ base: '100%', lg: '600px' }} direction={{ base: 'column', lg: 'row' }}>
                    <CalculatorProvider
                        transactionAmount={transactionAmount}
                        setTransactionAmount={setTransactionAmount}
                        handleKeyDown={handleKeyDown}
                        inputError={inputError}
                        inputRef={inputRef}
                        addTransaction={addTransaction}
                    >
                        <Calculator />
                    </CalculatorProvider>
                    <TransactionsProvider
                        handleClear={handleClear}
                        transactions={transactions}
                        promptDeleteTransaction={promptDeleteTransaction}
                        accumulatedCashback={accumulatedCashback}
                        remainingSpendLimit={remainingSpendLimit}
                    >
                        <Transactions />
                    </TransactionsProvider>
                </Flex>
                <Footer APP_VERSION={appVersion} lastOperationDate={lastOperationDate} />
            </Box>
        </Flex>

        <ClearAllTransactionsAlert isOpen={isOpen} onClose={onClose} clearAllTransactions={clearAllTransactions} />
        <DeleteTransactionAlert isDeleteOpen={isDeleteOpen} onDeleteClose={onDeleteClose} deleteTransaction={deleteTransaction} />
    </>)
}

export default VeloCashbackCalculator;

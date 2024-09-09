import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    Alert,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    CloseButton,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Link,
    Text,
    Tooltip,
    VStack,
    useBreakpointValue,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import {DeleteIcon, RepeatIcon} from '@chakra-ui/icons';

// Constants defining cashback rules and local storage key
const CASHBACK_PERCENTAGE_VALUE = 0.05;
const CASHBACK_MAX_VALUE = 60.00;
const CASHBACK_MAX_SPEND_VALUE = 1200.00;
const LOCALSTORAGE_KEY = 'velobankCashbackCalculatorData'
const APP_VERSION = '3.1';

function VeloCashbackCalculator() {

    // Load state from localStorage (transactions, cashback, spend limit, etc.)
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

    const cancelRef = React.useRef()
    const toast = useToast(); // Toast notifications for user feedback
    const isSmallScreen = useBreakpointValue({base: true, lg: false}); // Responsive design breakpoint

    // Function to add a new transaction
    const addTransaction = () => {
        const transactionInputValue = parseFloat(transactionAmount);

        // Validate transaction amount
        if (!transactionAmount || isNaN(transactionInputValue)) {
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
        showToast('item-added-success', "Pozycja dodana", "info")

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

    // Function to close input error alert
    const handleCloseAlert = () => setInputError(false);

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

    // Render the component UI
    return (<>
        <Flex width="100%" minHeight="100vh" alignItems="center" justifyContent="center" bg="#EDF2F7" padding={{
            base: "64px 24px",
            lg: "24px"
        }}
              direction="column">
            <Heading mb="16" textAlign="center"><Text display="inline-block" color="#00b13f">VeloBank</Text> Cashback
                Calculator</Heading>
            <Box width="100%"
                 maxWidth="1000px">
                {inputError && (<Alert status='error' borderRadius="8px" mb="6" ref={errorAlertRef}>
                    <Flex align='center' justifyContent='space-between' grow={1}>
                        <Flex>
                            <AlertIcon/>
                            <AlertTitle color="#c53030" fontWeight="semibold">Pole nie może być puste</AlertTitle>
                        </Flex>
                        <CloseButton onClick={handleCloseAlert}/>
                    </Flex>
                </Alert>)}
                <Flex
                    bg="white"
                    borderRadius="8px"
                    boxShadow="xl"
                    justifyContent="space-between"
                    gap={{
                        base: '6',
                        lg: ''
                    }}
                    maxHeight={{
                        base: '100%',
                        lg: '600px'
                    }}
                    height={{
                        base: '100%',
                        lg: '600px'
                    }}
                    direction={{
                        base: 'column',
                        lg: 'row'
                    }}
                >
                    <Box
                        width={{
                            base: '100%',
                            lg: '50%'
                        }}
                        p={{
                            base: '26px',
                            lg: '32px'
                        }}
                    >
                        <VStack alignItems="stretch" gap="6">
                            <VStack gap="2" alignItems="stretch">
                                <Box>
                                    <Heading size="md" mb="2">
                                        Dodaj swoje transakcje i sprawdź wartość cashbacku
                                    </Heading>
                                    <Text color="#4A5568" fontSize="base">Kalkulator umożliwia obliczenie wartości
                                        spodziewanego
                                        cashbacku od danej transakcji.</Text>
                                </Box>
                                <Box>
                                    <FormControl id="transaction-value" my="3">
                                        <FormLabel fontSize="sm">Wartość transakcji</FormLabel>
                                        <Input
                                            type="number"
                                            value={transactionAmount || ''}
                                            step="0.01"
                                            onChange={(e) => setTransactionAmount(e.target.value)}
                                            onBlur={() => setTransactionAmount(parseFloat(transactionAmount).toFixed(2))}
                                            onKeyDown={handleKeyDown}
                                            isInvalid={inputError}
                                            ref={inputRef}
                                        />
                                    </FormControl>
                                    <Button backgroundColor='#00b13f' color="white" _hover={{bg: '#029737'}}
                                            width="100%"
                                            onClick={addTransaction}
                                            isDisabled={!transactionAmount || isNaN(Number(transactionAmount)) || inputError}
                                    >Dodaj transakcję</Button>
                                </Box>
                            </VStack>
                            <Divider/>
                            <VStack fontSize="sm" gap="4" alignItems="stretch">
                                <Text color="#4A5568">VeloBank wprowadza nową promocję, w której nowi klienci mogą
                                    zyskać nawet do 600
                                    zł. Wystarczy otworzyć VeloKonto wraz z VeloSkarbonką, wyrazić zgody
                                    marketingowe i
                                    zalogować się do bankowości mobilnej, aby otrzymać 60 zł na start. Dodatkowo,
                                    przez
                                    9 miesięcy bank zwróci 5% wartości płatności bezgotówkowych kartą, telefonem lub
                                    BLIKIEM, maksymalnie do 540 zł. W promocji mogą wziąć osoby, które nie posiadały
                                    konta w VeloBanku w ostatnim czasie.</Text>
                                <Link color="#00b13f" display="inline-block"
                                      href="https://www.velobank.pl/klienci-indywidualni/biuro-prasowe/nowa-oferta-velobanku-60-zl-na-start-i-do-540-zl-zwrotu-za-zakupy.html"
                                      isExternal>Przeczytaj więcej o promocji</Link>
                            </VStack>
                        </VStack>
                    </Box>
                    <Box
                        width={{
                            base: '100%',
                            lg: '45%'
                        }}
                        bg="#F7FAFC"
                        p={{
                            base: '26px',
                            lg: '32px'
                        }}
                        borderRadius={{
                            base: '0 0 8px 8px',
                            lg: '0 8px 8px 0'
                        }}
                    >
                        <VStack gap="6" alignItems="stretch" height={{
                            base: '400px',
                            lg: '100%'
                        }}>
                            <Flex alignItems="center" justifyContent="space-between">
                                <Heading size="md">
                                    Twoje wydatki
                                </Heading>
                                <Tooltip label='Wyczyść listę'>
                                    <IconButton size="sm" aria-label='Wyczyść listę' icon={<RepeatIcon/>}
                                                onClick={handleClear} isDisabled={transactions.length === 0}/>
                                </Tooltip>
                            </Flex>
                            <Divider/>
                            <Flex height="100%" alignItems={transactions.length > 0 ? 'flex-start' : 'center'}
                                  justifyContent="center" flex="1" overflowY="auto">
                                {transactions.length > 0 ? <>
                                    <VStack spacing={4} align='stretch' width="100%">
                                        {transactions.map((payment) => (
                                            <Flex alignItems='center' justifyContent='space-between' gap={4}
                                                  key={payment.id}>
                                                <div>
                                                    <Text fontSize="lg"
                                                          fontWeight="semibold">{payment.value} PLN</Text>
                                                    <Text fontSize='sm'
                                                          color='#00b13f'>{payment.cashback} PLN</Text>
                                                </div>
                                                <Flex gap={4} align='stretch'>
                                                    <Tooltip label='Usuń pozycję'>
                                                        <IconButton aria-label='Usuń pozycję'
                                                                    icon={<DeleteIcon/>}
                                                                    colorScheme="red" size="sm"
                                                                    onClick={() => promptDeleteTransaction(payment)}
                                                        />
                                                    </Tooltip>
                                                </Flex>
                                            </Flex>))}
                                    </VStack>
                                </> : <Text color="#9ca5af">Brak danych do wyświetlenia</Text>}
                            </Flex>
                            <Divider/>
                            <Box>
                                <Flex justifyContent="space-between" fontWeight="bold" fontSize="lg"
                                      color="#00b13f">
                                    <Text>Twój cashback</Text>
                                    <Text>{accumulatedCashback.toFixed(2)} PLN</Text>
                                </Flex>
                                <Flex justifyContent="space-between" fontWeight="normal" fontSize="md" color="#9ca5af">
                                    <Text>Do wydania zostało</Text>
                                    <Text>{remainingSpendLimit.toFixed(2)} PLN</Text>
                                </Flex>
                            </Box>
                        </VStack>
                    </Box>
                </Flex>
                <Flex
                    mt={6}
                    alignItems="center"
                    justifyContent={{
                        base: 'center',
                        lg: 'space-between'
                    }}
                    width="100%"
                    direction={{
                        base: 'column',
                        lg: 'row'
                    }}
                >
                    <Text m={0} fontSize="xs" color="#9ca5af">Wersja: { APP_VERSION }</Text>
                    <Text m={0} fontSize="xs" color="#9ca5af">Data ostatniej operacji: {lastOperationDate ? lastOperationDate : "Brak operacji"}</Text>
                </Flex>
            </Box>
        </Flex>
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent margin={{
                    base: '0 1rem',
                    lg: ''
                }}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Wyczyścić listę?
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Czy na pewno chcesz wyczyścić listę wydatków?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Anuluj
                        </Button>
                        <Button colorScheme="red" onClick={clearAllTransactions} ml={3}>
                            Wyczyść
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        <AlertDialog
            isOpen={isDeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteClose}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent margin={{
                    base: '0 1rem',
                    lg: ''
                }}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Usuń pozycję?
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Czy na pewno chcesz usunąć tę pozycję? Tej operacji nie można cofnąć.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onDeleteClose}>
                            Anuluj
                        </Button>
                        <Button colorScheme="red" onClick={deleteTransaction} ml={3}>
                            Usuń
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

    </>)
}

export default VeloCashbackCalculator;

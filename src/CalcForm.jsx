import React, {useEffect, useRef, useState} from "react";
import {
    Button,
    Box,
    VStack,
    Flex,
    Text,
    IconButton,
    Alert,
    AlertIcon,
    AlertDialog,
    AlertTitle,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    CloseButton,
    NumberInput,
    NumberInputField,
    Heading,
    FormControl,
    FormLabel,
    Divider,
    Link,
    Tooltip,
    useToast,
    useDisclosure,
    useBreakpointValue, Input
} from '@chakra-ui/react';
import {DeleteIcon, RepeatIcon} from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';

const CASHBACK_PERCENTAGE_VALUE = 0.05;
const CASHBACK_MAX_VALUE = 60;
const CASHBACK_MAX_SPEND_VALUE = 1200;

function CalcForm() {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [inputValue, setInputValue] = useState(''); // State to manage input value
    const [error, setError] = useState(false);
    const [cashback, setCashback] = useState(0);
    const [toSpend, setToSpend] = useState(CASHBACK_MAX_SPEND_VALUE);
    const inputRef = useRef(null); // Ref for the input field
    const errorAlertRef = useRef(null);
    // clear modal
    const {isOpen, onOpen, onClose} = useDisclosure();
    // single item delete modal
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();

    // global cancel btn
    const cancelRef = React.useRef()
    const toast = useToast();

    // Detect if screen size is less than 'lg'
    const isSmallScreen = useBreakpointValue({base: true, lg: false});

    const handleAdd = () => {
        const parsedValue = Number(parseFloat(inputValue).toFixed(2));

        if (isNaN(parsedValue) || inputValue === '') {
            setError(true);
            return;
        }

        let cashbackValue = parseFloat((parsedValue * CASHBACK_PERCENTAGE_VALUE).toFixed(2));

        setPayments([...payments, {
            id: uuidv4(), value: parsedValue, cashback: cashbackValue,
        }]);

        setCashback(parseFloat((cashback + cashbackValue).toFixed(2)));
        setToSpend(parseFloat((toSpend - parsedValue).toFixed(2)));

        showToast('item-added-success', "Pozycja dodana", "success")

        setInputValue(''); // Clear the input field by setting state

        if (!isSmallScreen && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleDelete = (payment) => {
        setSelectedPayment(payment); // Set the payment to delete
        onDeleteOpen(); // Open the alert dialog
    };
    const confirmDelete = () => {
        const {id, cashback} = selectedPayment;
        setPayments(payments.filter((payment) => payment.id !== id));

        // Subtract the cashback value from the total cashback
        setCashback((prevCashback) => parseFloat((prevCashback - cashback).toFixed(2)));

        // Increase the toSpend value by the deleted payment's value
        setToSpend((prevToSpend) => parseFloat((prevToSpend + parseFloat(selectedPayment.value)).toFixed(2)));

        // Clear the selected payment after deletion
        setSelectedPayment(null);

        // Close the dialog
        onDeleteClose();

        showToast("item-deleted-success", "Pozycja usunięta", "info");

        // Refocus the input field
        if (!isSmallScreen && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleClear = () => {
        onOpen(); // Show the confirmation dialog
    };

    const confirmClear = () => {
        setPayments([]);
        setInputValue('');
        setError(false);
        setCashback(0);
        setToSpend(CASHBACK_MAX_SPEND_VALUE);
        onClose();
        showToast("clear-success", "Lista wydatków została wyczyszczona.", "info")

        if (isSmallScreen && inputRef.current) {
            inputRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }

    };

    const handleCloseAlert = () => setError(false);

    const showToast = (id, message, type = 'success') => {
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
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    useEffect(() => {
        if (isSmallScreen && errorAlertRef.current) {
            errorAlertRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [error, isSmallScreen])

    useEffect(() => {
        if (payments.length > 0) {
            setError(false);
        }
    }, [payments]);

    useEffect(() => {
        if (cashback >= CASHBACK_MAX_VALUE) {
            showToast("cashback-success", "Wygląda na to, że spełniłeś wszystkie warunki aby otrzymać pełną kwotę cashbacku.", "success")
        }
    }, [cashback])

    return (<>
        <Flex width="100%" minHeight="100vh" alignItems="center" justifyContent="center" bg="#EDF2F7" padding={{
            base: "64px 24px",
            lg: "24px"
        }}
              direction="column">
            <Heading mb="16" textAlign="center"><Text display="inline-block" color="#00b140">VeloBank</Text> Cashback
                Calculator</Heading>
            <Box width="100%"
                 maxWidth="1000px">
                {error && (<Alert status='error' borderRadius="8px" mb="6" ref={errorAlertRef}>
                    <Flex align='center' justifyContent='space-between' grow={1}>
                        <Flex>
                            <AlertIcon/>
                            <AlertTitle color="#c53030" fontWeight="semibold">Pole nie może być
                                puste</AlertTitle>
                        </Flex>
                        <CloseButton onClick={handleCloseAlert}/>
                    </Flex>
                </Alert>)}
                <Flex
                    bg="white"
                    p="20px"
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
                    <Box width={{
                        base: '100%',
                        lg: '60%'
                    }}>
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
                                            value={inputValue}
                                            step="0.01"
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onBlur={() => setInputValue(parseFloat(inputValue).toFixed(2))}
                                            onKeyDown={handleKeyDown}
                                            isInvalid={error}
                                            ref={inputRef}
                                        />
                                    </FormControl>
                                    <Button backgroundColor='#00b140' color="white" _hover={{bg: '#029737'}}
                                            width="100%"
                                            onClick={handleAdd}
                                            isDisabled={!inputValue}
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
                                <Link color="#00b140" display="inline-block"
                                      href="https://www.velobank.pl/klienci-indywidualni/biuro-prasowe/nowa-oferta-velobanku-60-zl-na-start-i-do-540-zl-zwrotu-za-zakupy.html"
                                      isExternal>Przeczytaj więcej o promocji</Link>
                            </VStack>
                        </VStack>
                    </Box>
                    <Box width={{
                        base: '100%',
                        lg: '35%'
                    }} bg="#F7FAFC" p="20px" borderRadius="8px">
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
                                                onClick={handleClear} isDisabled={payments.length === 0} />
                                </Tooltip>
                            </Flex>
                            <Divider/>
                            <Flex height="100%" alignItems={payments.length > 0 ? 'flex-start' : 'center'}
                                  justifyContent="center" flex="1" overflowY="auto">
                                {payments.length > 0 ? <>
                                    <VStack spacing={4} align='stretch' width="100%">
                                        {payments.map((payment) => (
                                            <Flex alignItems='center' justifyContent='space-between' gap={4}
                                                  key={payment.id}>
                                                <div>
                                                    <Text fontSize="lg"
                                                          fontWeight="semibold">{payment.value} PLN</Text>
                                                    <Text fontSize='sm'
                                                          color='#00b140'>{payment.cashback} PLN</Text>
                                                </div>
                                                <Flex gap={4} align='stretch'>
                                                    <Tooltip label='Usuń pozycję'>
                                                        <IconButton aria-label='Usuń pozycję'
                                                                    icon={<DeleteIcon/>}
                                                                    colorScheme="red" size="sm"
                                                                    onClick={() => handleDelete(payment)}
                                                        />
                                                    </Tooltip>
                                                </Flex>
                                            </Flex>))}
                                    </VStack>
                                </> : <Text>Brak danych do wyświetlenia</Text>}
                            </Flex>
                            <Divider/>
                            <Box>
                                <Flex justifyContent="space-between" fontWeight="bold" fontSize="lg"
                                      color="#00b140">
                                    <Text>Twój cashback</Text>
                                    <Text>{cashback.toFixed(2)} PLN</Text>
                                </Flex>
                                <Flex justifyContent="space-between" fontWeight="normal" fontSize="md">
                                    <Text>Do wydania zostało</Text>
                                    <Text>{toSpend.toFixed(2)} PLN</Text>
                                </Flex>
                            </Box>
                        </VStack>
                    </Box>
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
                        <Button colorScheme="red" onClick={confirmClear} ml={3}>
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
                <AlertDialogContent>
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
                        <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                            Usuń
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

    </>)
}

export default CalcForm;

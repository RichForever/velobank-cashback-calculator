import React from "react";
import {Box, Button, Divider, FormControl, FormLabel, Heading, Input, Link, Text, VStack} from "@chakra-ui/react";

const CalculatorForm = ({ transactionAmount, setTransactionAmount, handleKeyDown, inputError, inputRef, addTransaction }) => {
    return (
        <Box width={{ base: '100%', lg: '50%' }} p={{ base: '26px', lg: '32px' }} >
            <VStack alignItems="stretch" gap="6">
                <VStack gap="2" alignItems="stretch">
                    <Box>
                        <Heading size="md" mb="2">Dodaj swoje transakcje i sprawdź wartość cashbacku </Heading>
                        <Text color="#4A5568" fontSize="base">Kalkulator umożliwia obliczenie wartości spodziewanego cashbacku od danej transakcji.</Text>
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
                    <Text color="#4A5568">VeloBank wprowadza nową promocję, w której nowi klienci mogą zyskać nawet do 600 zł. Wystarczy otworzyć VeloKonto wraz z VeloSkarbonką, wyrazić zgody marketingowe i zalogować się do bankowości mobilnej, aby otrzymać 60 zł na start. Dodatkowo, przez 9 miesięcy bank zwróci 5% wartości płatności bezgotówkowych kartą, telefonem lub BLIKIEM, maksymalnie do 540 zł. W promocji mogą wziąć osoby, które nie posiadały konta w VeloBanku w ostatnim czasie.</Text>
                    <Link color="#00b13f" display="inline-block" href="https://www.velobank.pl/klienci-indywidualni/biuro-prasowe/nowa-oferta-velobanku-60-zl-na-start-i-do-540-zl-zwrotu-za-zakupy.html" isExternal>Przeczytaj więcej o promocji</Link>
                </VStack>
            </VStack>
        </Box>
    )
}
export default CalculatorForm;
import React from "react";
import {Flex, IconButton, Text, Tooltip, VStack} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import { useTransactionsContext } from "./TransactionsContext";

const TransactionsList = () => {
    const { transactions, promptDeleteTransaction } = useTransactionsContext();
    return (
        <Flex height="100%" alignItems={transactions.length > 0 ? 'flex-start' : 'center'}
              justifyContent="center" flex="1" overflowY="auto">
            {transactions.length > 0 ? <>
                <VStack spacing={4} align='stretch' width="100%">
                    {transactions.map((transaction) => (
                        <Flex alignItems='center' justifyContent='space-between' gap={4} key={transaction.id}>
                            <div>
                                <Text fontSize="lg" fontWeight="semibold">{transaction.value.toFixed(2)} PLN</Text>
                                <Text fontSize='sm' color='#00b13f'>{transaction.cashback.toFixed(2)} PLN</Text>
                            </div>
                            <Flex gap={4} align='stretch'>
                                <Tooltip label='Usuń pozycję'>
                                    <IconButton aria-label='Usuń pozycję' icon={<DeleteIcon/>} colorScheme="red" size="sm" onClick={() => promptDeleteTransaction(transaction)} />
                                </Tooltip>
                            </Flex>
                        </Flex>))}
                </VStack>
            </> : <Text color="#9ca5af">Brak danych do wyświetlenia</Text>}
        </Flex>
    )
}
export default TransactionsList;
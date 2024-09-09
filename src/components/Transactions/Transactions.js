import React from "react";
import {Box, Divider, VStack} from "@chakra-ui/react";
import TransactionsHeading from "./TransactionsHeading";
import TransactionsList from "./TransactionsList";
import TransactionsSummary from "./TransactionsSummary";

const Transactions = ({ handleClear, transactions, promptDeleteTransaction, accumulatedCashback, remainingSpendLimit }) => {
    return (
        <Box width={{ base: '100%', lg: '45%' }} bg="#F7FAFC" p={{ base: '26px', lg: '32px' }} borderRadius={{ base: '0 0 8px 8px', lg: '0 8px 8px 0' }}>
            <VStack gap="6" alignItems="stretch" height={{ base: '400px', lg: '100%' }}>
                <TransactionsHeading handleClear={handleClear} transactions={transactions} />
                <Divider/>
                <TransactionsList transactions={transactions} promptDeleteTransaction={promptDeleteTransaction} />
                <Divider/>
                <TransactionsSummary accumulatedCashback={accumulatedCashback} remainingSpendLimit={remainingSpendLimit} />
            </VStack>
        </Box>
    )
}
export default Transactions;
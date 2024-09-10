import React from "react";
import {Box, Divider, useColorModeValue, VStack} from "@chakra-ui/react";
import TransactionsHeading from "./TransactionsHeading";
import TransactionsList from "./TransactionsList";
import TransactionsSummary from "./TransactionsSummary";

const Transactions = () => {
    const bg = useColorModeValue("#F7FAFC", "#353535");
    return (
        <Box width={{ base: '100%', lg: '45%' }} bg={bg} p={{ base: 6, lg: 8 }} borderRadius={{ base: '0 0 8px 8px', lg: '0 8px 8px 0' }}>
            <VStack gap="6" alignItems="stretch" height={{ base: '400px', lg: '100%' }}>
                <TransactionsHeading />
                <Divider />
                <TransactionsList />
                <Divider />
                <TransactionsSummary />
            </VStack>
        </Box>
    );
};
export default Transactions;
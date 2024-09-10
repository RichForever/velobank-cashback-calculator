import React from "react";
import {Box, Flex, Text} from "@chakra-ui/react";
import { useTransactionsContext } from "./TransactionsContext";

const TransactionsSummary = () => {
    const { accumulatedCashback, remainingSpendLimit } = useTransactionsContext();
    return (
        <Box>
            <Flex justifyContent="space-between" fontWeight="bold" fontSize="lg" color="#00b13f">
                <Text>Twój cashback</Text>
                <Text>{accumulatedCashback.toFixed(2)} PLN</Text>
            </Flex>
            <Flex justifyContent="space-between" fontWeight="normal" fontSize="md" color="#9ca5af">
                <Text>Do wydania zostało</Text>
                <Text>{remainingSpendLimit.toFixed(2)} PLN</Text>
            </Flex>
        </Box>
    )
}
export default TransactionsSummary;
import React from "react";
import {Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import { useTransactionsContext } from "./TransactionsContext";

const TransactionsSummary = () => {
    const { accumulatedCashback, remainingSpendLimit } = useTransactionsContext();
    const textColor = useColorModeValue("#9ca5af", "#8f908f");
    return (
        <Box>
            <Flex justifyContent="space-between" fontWeight="bold" fontSize="lg" color="#00b13f">
                <Text>Twój cashback</Text>
                <Text>{accumulatedCashback.toFixed(2)} PLN</Text>
            </Flex>
            <Flex justifyContent="space-between" fontWeight="normal" fontSize="md" color={textColor}>
                <Text>Do wydania zostało</Text>
                <Text>{remainingSpendLimit.toFixed(2)} PLN</Text>
            </Flex>
        </Box>
    )
}
export default TransactionsSummary;
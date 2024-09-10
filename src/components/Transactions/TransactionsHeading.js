import React from "react";
import {Flex, Heading, IconButton, Tooltip} from "@chakra-ui/react";
import {RepeatIcon} from "@chakra-ui/icons";
import { useTransactionsContext } from "./TransactionsContext";

const TransactionsHeading = () => {
    const { handleClear, transactions } = useTransactionsContext();
    return (
        <Flex alignItems="center" justifyContent="space-between">
            <Heading size="md">Twoje wydatki</Heading>
            <Tooltip label='Wyczyść listę'>
                <IconButton size="sm" aria-label='Wyczyść listę' icon={<RepeatIcon/>} onClick={handleClear} isDisabled={transactions.length === 0}/>
            </Tooltip>
        </Flex>
    );
}
export default TransactionsHeading;
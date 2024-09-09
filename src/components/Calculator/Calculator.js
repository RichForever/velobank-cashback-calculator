import React from "react";
import {Box, Divider, VStack} from "@chakra-ui/react";
import CalculatorHeading from "./CalculatorHeading";
import CalculatorDescription from "./CalculatorDescription";
import CalculatorForm from "./CalculatorForm";

const Calculator = ({ transactionAmount, setTransactionAmount, handleKeyDown, inputError, inputRef, addTransaction }) => {
    return (
        <Box width={{ base: '100%', lg: '50%' }} p={{ base: '26px', lg: '32px' }} >
            <VStack alignItems="stretch" gap="6">
                <VStack gap="2" alignItems="stretch">
                    <CalculatorHeading />
                    <CalculatorForm transactionAmount={transactionAmount} setTransactionAmount={setTransactionAmount} handleKeyDown={handleKeyDown} inputError={inputError} inputRef={inputRef} addTransaction={addTransaction} />
                </VStack>
                <Divider/>
                <CalculatorDescription />
            </VStack>
        </Box>
    )
}
export default Calculator;
import React from "react";
import { Box, Button, FormControl, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import { useCalculatorContext } from "../context/CalculatorProvider";

const CalculatorForm = () => {
    const { transactionAmount, setTransactionAmount, formError, inputRef, addTransaction } = useCalculatorContext();

    // Handle Enter key press to add transaction
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTransaction();
        }
    };

    const inputBorderColor = useColorModeValue("lightMode.inputBorder", "darkMode.inputBorder");
    const inputLabelColor = useColorModeValue("lightMode.text", "darkMode.text");
    return (
        <Box>
            <FormControl id="transaction-value" my="3">
                <FormLabel fontSize="sm" color={inputLabelColor}>Wartość transakcji</FormLabel>
                <Input
                    type="number"
                    value={transactionAmount || ''}
                    step="0.01"
                    onChange={(e) => setTransactionAmount(e.target.value)}
                    onBlur={() => setTransactionAmount(parseFloat(transactionAmount).toFixed(2))}
                    onKeyDown={handleKeyDown}
                    isInvalid={formError}
                    ref={inputRef}
                    borderColor={inputBorderColor}
                />
            </FormControl>
            <Button variant="customButton" width="100%" onClick={addTransaction} isDisabled={!transactionAmount || isNaN(Number(transactionAmount)) || formError}>Dodaj transakcję</Button>
        </Box>
    )
}
export default CalculatorForm;
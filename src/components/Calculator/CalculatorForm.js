import React from "react";
import {Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";

const CalculatorForm = ({ transactionAmount, setTransactionAmount, handleKeyDown, inputError, inputRef, addTransaction }) => {
    return (
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
            <Button backgroundColor='#00b13f' color="white" _hover={{bg: '#029737'}} width="100%" onClick={addTransaction} isDisabled={!transactionAmount || isNaN(Number(transactionAmount)) || inputError}>Dodaj transakcję</Button>
        </Box>
    )
}
export default CalculatorForm;
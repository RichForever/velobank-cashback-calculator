import React from "react";
import {Box, Divider, VStack} from "@chakra-ui/react";
import CalculatorHeading from "./CalculatorHeading";
import CalculatorDescription from "./CalculatorDescription";
import CalculatorForm from "./CalculatorForm";

const Calculator = () => {
    return (
        <Box width={{ base: '100%', lg: '50%' }} p={{ base: 6, lg: 8 }} >
            <VStack alignItems="stretch" gap="6">
                <VStack gap="2" alignItems="stretch">
                    <CalculatorHeading />
                    <CalculatorForm />
                </VStack>
                <Divider/>
                <CalculatorDescription />
            </VStack>
        </Box>
    )
}
export default Calculator;
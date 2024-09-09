import React from "react";
import {Box, Heading, Text} from "@chakra-ui/react";

const CalculatorHeading = () => {
    return (
        <Box>
            <Heading size="md" mb="2">Dodaj swoje transakcje i sprawdź wartość cashbacku</Heading>
            <Text color="#4A5568" fontSize="base">Kalkulator umożliwia obliczenie wartości spodziewanego cashbacku od danej transakcji.</Text>
        </Box>
    )
}
export default CalculatorHeading;
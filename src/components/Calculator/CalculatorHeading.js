import React from "react";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const CalculatorHeading = () => {
    const textColor = useColorModeValue("lightMode.text", "darkMode.text");
    return (
        <Box>
            <Heading size="md" mb="2">Dodaj swoje transakcje i sprawdź wartość cashbacku</Heading>
            <Text color={textColor} fontSize="base">Kalkulator umożliwia obliczenie wartości spodziewanego cashbacku od danej transakcji.</Text>
        </Box>
    )
}
export default CalculatorHeading;
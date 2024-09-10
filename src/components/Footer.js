import React from "react";
import {Flex, Text, useColorModeValue} from "@chakra-ui/react";

const Footer = ({ APP_VERSION, lastOperationDate }) => {
    const textColor = useColorModeValue("#9ca5af", "#757675");
    return (
        <Flex mt={6} alignItems="center" justifyContent={{ base: 'center', lg: 'space-between' }} width="100%" direction={{ base: 'column', lg: 'row' }} color={textColor}>
            <Text m={0} fontSize="xs">Wersja: { APP_VERSION }</Text>
            <Text m={0} fontSize="xs">Data ostatniej operacji: {lastOperationDate ? lastOperationDate : "Brak operacji"}</Text>
        </Flex>
    )
}
export default Footer;
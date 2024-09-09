import React from "react";
import {Flex, Text} from "@chakra-ui/react";

const Footer = ({ APP_VERSION, lastOperationDate }) => {
    return (
        <Flex mt={6} alignItems="center" justifyContent={{ base: 'center', lg: 'space-between' }} width="100%" direction={{ base: 'column', lg: 'row' }} >
            <Text m={0} fontSize="xs" color="#9ca5af">Wersja: { APP_VERSION }</Text>
            <Text m={0} fontSize="xs" color="#9ca5af">Data ostatniej operacji: {lastOperationDate ? lastOperationDate : "Brak operacji"}</Text>
        </Flex>
    )
}
export default Footer;
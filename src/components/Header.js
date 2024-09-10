import React from "react";
import {Heading, Text} from "@chakra-ui/react";

const Header = () => {
    return (
        <Heading mb="16" mt={{ base: 24, lg: 0 }} textAlign="center">
            <Text display="inline-block" color="#00b13f">VeloBank</Text> Cashback Calculator
        </Heading>
    )
}
export default Header;
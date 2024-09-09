import React from "react";
import {Link, Text, VStack} from "@chakra-ui/react";

const CalculatorDescription = () => {
    return (
        <VStack fontSize="sm" gap="4" alignItems="stretch">
            <Text color="#4A5568">VeloBank wprowadza nową promocję, w której nowi klienci mogą zyskać nawet do 600 zł. Wystarczy otworzyć VeloKonto wraz z VeloSkarbonką, wyrazić zgody marketingowe i zalogować się do bankowości mobilnej, aby otrzymać 60 zł na start. Dodatkowo, przez 9 miesięcy bank zwróci 5% wartości płatności bezgotówkowych kartą, telefonem lub BLIKIEM, maksymalnie do 540 zł. W promocji mogą wziąć osoby, które nie posiadały konta w VeloBanku w ostatnim czasie.</Text>
            <Link color="#00b13f" display="inline-block" href="https://www.velobank.pl/klienci-indywidualni/biuro-prasowe/nowa-oferta-velobanku-60-zl-na-start-i-do-540-zl-zwrotu-za-zakupy.html" isExternal>Przeczytaj więcej o promocji</Link>
        </VStack>
    )
}
export default CalculatorDescription;
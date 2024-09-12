import React, { useRef } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useColorModeValue } from "@chakra-ui/react";
import { useAlertsContext } from "../context/AlertsProvider";

const AlertsClearAllTransactions = () => {

    const { isOpen, onClose, clearAllTransactions } = useAlertsContext();
    const cancelRef = useRef();
    const bg = useColorModeValue("white", "darkMode.bgWrapperPrimary");

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent margin={{ base: '0 1rem', lg: '' }} bg={bg}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">Wyczyścić listę transakcji? </AlertDialogHeader>
                    <AlertDialogBody>Czy na pewno chcesz wyczyścić listę transakcji?</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>Anuluj</Button>
                        <Button colorScheme="red" onClick={clearAllTransactions} ml={3}>Wyczyść</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}
export default AlertsClearAllTransactions;
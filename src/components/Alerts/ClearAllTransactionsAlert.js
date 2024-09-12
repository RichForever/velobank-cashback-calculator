import React, { useRef } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useColorModeValue } from "@chakra-ui/react";

const ClearAllTransactionsAlert = ({ isOpen, onClose, clearAllTransactions }) => {

    const bg = useColorModeValue("white", "darkMode.bgWrapperPrimary");

    const cancelRef = useRef();

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
export default ClearAllTransactionsAlert;
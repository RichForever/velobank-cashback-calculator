import React from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button
} from "@chakra-ui/react";

const ClearAllTransactionsAlert = ({ isOpen, onClose, cancelRef, clearAllTransactions }) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent margin={{ base: '0 1rem', lg: '' }}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">Wyczyścić listę? </AlertDialogHeader>
                    <AlertDialogBody>Czy na pewno chcesz wyczyścić listę wydatków?</AlertDialogBody>
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
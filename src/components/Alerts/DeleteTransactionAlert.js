import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button, useColorModeValue
} from "@chakra-ui/react";
import React from "react";

const DeleteTransactionAlert = ({ isDeleteOpen, onDeleteClose, cancelRef, deleteTransaction }) => {
    const bg = useColorModeValue("white", "darkMode.bgWrapperPrimary");
    return (
        <AlertDialog
            isOpen={isDeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteClose}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent margin={{ base: '0 1rem', lg: '' }} bg={bg}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">Usuń pozycję?</AlertDialogHeader>
                    <AlertDialogBody>Czy na pewno chcesz usunąć tę pozycję? Tej operacji nie można cofnąć.</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onDeleteClose}>Anuluj</Button>
                        <Button colorScheme="red" onClick={deleteTransaction} ml={3}>Usuń</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}
export default DeleteTransactionAlert;
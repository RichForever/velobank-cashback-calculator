import React, { useRef } from 'react';

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useColorModeValue } from '@chakra-ui/react';

import { useAlertsContext } from '../context/AlertsProvider';
import { useAppContext } from '../context/AppProvider';

const AlertsClearAllTransactions = () => {
  const { isOpen, onClose } = useAlertsContext();
  const { clearAllTransactions } = useAppContext();
  const cancelRef = useRef();

  const bg = useColorModeValue('white', 'darkMode.bgWrapperPrimary');
  const textColor = useColorModeValue('lightMode.textSecondary', 'darkMode.textSecondary');

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered={true}>
      <AlertDialogOverlay>
        <AlertDialogContent margin={{ base: '0 1rem', lg: '' }} bg={bg}>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Wyczyścić listę transakcji?
          </AlertDialogHeader>
          <AlertDialogBody fontWeight='600' color={textColor}>
            Czy na pewno chcesz wyczyścić listę transakcji?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} fontWeight='700'>
              Anuluj
            </Button>
            <Button colorScheme='red' onClick={clearAllTransactions} ml={3} fontWeight='700'>
              Wyczyść
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default AlertsClearAllTransactions;

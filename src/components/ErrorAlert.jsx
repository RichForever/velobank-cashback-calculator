import React from 'react';
import { Alert, AlertIcon, AlertTitle, CloseButton, Flex } from '@chakra-ui/react';
import {useAppContext} from "../context/AppProvider";

const ErrorAlert = () => {

  const { errorAlertRef, setFormError, inputRef, setTransactionAmount } = useAppContext();
  const handleClick = () => {
    setFormError(false);
    setTransactionAmount('')
    inputRef.current.focus();
  }

  return (
    <Alert status='error' borderRadius={6} mb={6} ref={errorAlertRef}>
      <Flex align='center' justifyContent='space-between' grow={1}>
        <Flex>
          <AlertIcon />
          <AlertTitle color='alert' fontWeight='semibold'>
            Pole nie może być puste lub wartość transakcji musi być większa od 0
          </AlertTitle>
        </Flex>
        <CloseButton onClick={handleClick} />
      </Flex>
    </Alert>
  );
};
export default ErrorAlert;

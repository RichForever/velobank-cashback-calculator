import React from "react";
import {Alert, AlertIcon, AlertTitle, CloseButton, Flex} from "@chakra-ui/react";

const ErrorAlert = ({ inputError, errorAlertRef, handleCloseAlert }) => {
    return (
        <Alert status='error' borderRadius="8px" mb="6" ref={errorAlertRef}>
            <Flex align='center' justifyContent='space-between' grow={1}>
                <Flex>
                    <AlertIcon/>
                    <AlertTitle color="#c53030" fontWeight="semibold">Pole nie może być puste</AlertTitle>
                </Flex>
                <CloseButton onClick={handleCloseAlert}/>
            </Flex>
        </Alert>
    )
}
export default ErrorAlert;
import React from "react";
import {Alert, AlertIcon, AlertTitle, CloseButton, Flex} from "@chakra-ui/react";

const ErrorAlert = ({ errorAlertRef, setInputError }) => {

    // Function to close input error alert
    const handleCloseAlert = () => setInputError(false);

    return (
        <Alert status='error' borderRadius={2} mb={6} ref={errorAlertRef}>
            <Flex align='center' justifyContent='space-between' grow={1}>
                <Flex>
                    <AlertIcon/>
                    <AlertTitle color="alert" fontWeight="semibold">Pole nie może być puste</AlertTitle>
                </Flex>
                <CloseButton onClick={handleCloseAlert}/>
            </Flex>
        </Alert>
    )
}
export default ErrorAlert;
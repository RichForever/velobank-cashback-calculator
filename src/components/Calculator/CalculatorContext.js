import React, { createContext, useContext } from "react";

// Create the context
const CalculatorContext = createContext();

export const useCalculatorContext = () => useContext(CalculatorContext);

// Provider component
export const CalculatorProvider = ({ children, transactionAmount, setTransactionAmount, handleKeyDown, inputError, inputRef, addTransaction }) => {
    return (
        <CalculatorContext.Provider value={{ transactionAmount, setTransactionAmount, handleKeyDown, inputError, inputRef, addTransaction }}>
            {children}
        </CalculatorContext.Provider>
    );
};
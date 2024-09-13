import { createContext, useContext } from 'react';

// Create the context
const CalculatorContext = createContext();

const useCalculatorContext = () => useContext(CalculatorContext);

export { CalculatorContext, useCalculatorContext };

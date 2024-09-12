import { createContext, useContext } from "react";

// Create the context
export const CalculatorContext = createContext();

export const useCalculatorContext = () => useContext(CalculatorContext);

// Provider sample component
// export const CalculatorProvider = ({ children, transactionAmount, setTransactionAmount, formError, inputRef, addTransaction }) => {
//     return (
//         <CalculatorContext.Provider value={{ transactionAmount, setTransactionAmount, formError, inputRef, addTransaction }}>
//             {children}
//         </CalculatorContext.Provider>
//     );
// };
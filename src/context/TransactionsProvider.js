import { createContext, useContext } from "react";

// Create the context
export const TransactionsContext = createContext();

// Custom hook to use the TransactionsContext
export const useTransactionsContext = () => useContext(TransactionsContext);

// Provider sample component
// export const TransactionsProvider = ({ children, handleClear, transactions, promptDeleteTransaction, accumulatedCashback, remainingSpendLimit }) => {
//     return (
//         <TransactionsContext.Provider value={{ handleClear, transactions, promptDeleteTransaction, accumulatedCashback, remainingSpendLimit }}>
//             {children}
//         </TransactionsContext.Provider>
//     );
// };

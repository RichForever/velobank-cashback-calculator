import { createContext, useContext } from "react";

// Create the context
export const AlertsContext = createContext();

// Custom hook to use the TransactionsContext
export const useAlertsContext = () => useContext(AlertsContext);

// Provider sample component
// export const AlertsProvider = ({ children, isOpen, onClose, clearAllTransactions, isDeleteOpen, onDeleteClose, deleteTransaction }) => {
//     return (
//         <AlertsContext.Provider value={{ isOpen, onClose, clearAllTransactions, isDeleteOpen, onDeleteClose, deleteTransaction }}>
//             {children}
//         </AlertsContext.Provider>
//     );
// };

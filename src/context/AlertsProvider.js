import { createContext, useContext } from 'react';

// Create the context
const AlertsContext = createContext();

// Custom hook to use the TransactionsContext
const useAlertsContext = () => useContext(AlertsContext);

export { AlertsContext, useAlertsContext };

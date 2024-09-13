import { createContext, useContext } from 'react';

// Create the context
const TransactionsContext = createContext();

// Custom hook to use the TransactionsContext
const useTransactionsContext = () => useContext(TransactionsContext);

export { TransactionsContext, useTransactionsContext };

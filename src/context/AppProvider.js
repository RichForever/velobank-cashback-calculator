import { createContext, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use the TransactionsContext
const useAppContext = () => useContext(AppContext);

export { AppContext, useAppContext };

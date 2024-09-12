import { useCallback } from "react";

export const useValidObjectStructure = () => {

    return useCallback((data) => {

        const defaultObject = {
            lastOperationDate: "",
            accumulatedCashback: "",
            remainingSpendLimit: "",
            transactions: ""
        }

        const actualKeys = Object.keys(data);
        const defaultKeys = Object.keys(defaultObject);
        return defaultKeys.every(key => actualKeys.includes(key));
    }, []);

}
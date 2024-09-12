import AlertsClearAllTransactions from "./AlertsClearAllTransactions";
import DeleteTransactionAlert from "./AlertsDeleteTransaction";
import React from "react";

const Alerts = () => {
    return (
        <>
            <AlertsClearAllTransactions />
            <DeleteTransactionAlert />
        </>
    )
}
export default Alerts;
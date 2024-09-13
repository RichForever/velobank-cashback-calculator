import React from 'react';
import AlertsClearAllTransactions from './AlertsClearAllTransactions';
import DeleteTransactionAlert from './AlertsDeleteTransaction';

const Alerts = () => {
  return (
    <>
      <AlertsClearAllTransactions />
      <DeleteTransactionAlert />
    </>
  );
};
export default Alerts;

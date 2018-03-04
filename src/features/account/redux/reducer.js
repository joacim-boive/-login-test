// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as deleteCustomerAccountReducer } from './deleteAccount';
import { reducer as getCustomerAccountTermsReducer } from './getAccountTerms';
import { reducer as getCustomerAccountReducer } from './getAccount';
import { reducer as getCustomerAccountAllowedPartPaymentsReducer } from './getAccountAllowedPartPayments';
import { reducer as getCustomerAccountBillsReducer } from './getAccountBills';
import { reducer as getCustomerAccountCampaignPurchasesReducer } from './getAccountCampaignPurchases';
import { reducer as getCustomerAccountCardsReducer } from './getAccountCards';
import { reducer as getCustomerAccountTransactionsReducer } from './getAccountTransactions';
import { reducer as getCustomerAccountsReducer } from './getAccounts';
import { reducer as getAccountPaymentTermsReducer } from './getAccountPaymentTerms';
import { reducer as getAccountLimitRaiseTermsReducer } from './getAccountLimitRaiseTerms';
import { reducer as updateCustomerAccountReducer } from './updateAccount';
import { reducer as updateCustomerAccountTransactionPartPaymentReducer } from './updateAccountTransactionPartPayment';
import { reducer as updateCustomerAccountCardReducer } from './updateAccountCard';

const reducers = [
  deleteCustomerAccountReducer,
  getCustomerAccountTermsReducer,
  getCustomerAccountReducer,
  getCustomerAccountAllowedPartPaymentsReducer,
  getCustomerAccountBillsReducer,
  getCustomerAccountCampaignPurchasesReducer,
  getCustomerAccountCardsReducer,
  getCustomerAccountTransactionsReducer,
  getCustomerAccountsReducer,
  getCustomerExtraCardHoldersReducer,
  getAccountPaymentTermsReducer,
  getAccountLimitRaiseTermsReducer,
  updateCustomerAccountReducer,
  updateCustomerAccountTransactionPartPaymentReducer,
  updateCustomerAccountCardReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}

// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as deleteAccountReducer } from './deleteAccount';
import { reducer as getAccountTermsReducer } from './getAccountTerms';
import { reducer as getAccountReducer } from './getAccount';
import { reducer as getAccountAllowedPartPaymentsReducer } from './getAccountAllowedPartPayments';
import { reducer as getAccountBillsReducer } from './getAccountBills';
import { reducer as getAccountCampaignPurchasesReducer } from './getAccountCampaignPurchases';
import { reducer as getAccountCardsReducer } from './getAccountCards';
import { reducer as getAccountTransactionsReducer } from './getAccountTransactions';
import { reducer as getAccountsReducer } from './getAccounts';
import { reducer as getAccountPaymentTermsReducer } from './getAccountPaymentTerms';
import { reducer as getAccountLimitRaiseTermsReducer } from './getAccountLimitRaiseTerms';
import { reducer as updateAccountReducer } from './updateAccount';
import { reducer as updateAccountTransactionPartPaymentReducer } from './updateAccountTransactionPartPayment';
import { reducer as updateAccountCardReducer } from './updateAccountCard';

const reducers = [
  deleteAccountReducer,
  getAccountTermsReducer,
  getAccountReducer,
  getAccountAllowedPartPaymentsReducer,
  getAccountBillsReducer,
  getAccountCampaignPurchasesReducer,
  getAccountCardsReducer,
  getAccountTransactionsReducer,
  getAccountsReducer,
  getAccountPaymentTermsReducer,
  getAccountLimitRaiseTermsReducer,
  updateAccountReducer,
  updateAccountTransactionPartPaymentReducer,
  updateAccountCardReducer,
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

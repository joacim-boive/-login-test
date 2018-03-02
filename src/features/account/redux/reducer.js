// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as deleteCustomerAccountReducer } from './deleteCustomerAccount';
import { reducer as getCustomerAccountTermsReducer } from './getCustomerAccountTerms';
import { reducer as getCustomerAccountReducer } from './getCustomerAccount';
import { reducer as getCustomerAccountAllowedPartPaymentsReducer } from './getCustomerAccountAllowedPartPayments';
import { reducer as getCustomerAccountBillsReducer } from './getCustomerAccountBills';
import { reducer as getCustomerAccountCampaignPurchasesReducer } from './getCustomerAccountCampaignPurchases';
import { reducer as getCustomerAccountCardsReducer } from './getCustomerAccountCards';
import { reducer as getCustomerAccountTransactionsReducer } from './getCustomerAccountTransactions';
import { reducer as getCustomerAccountsReducer } from './getCustomerAccounts';
import { reducer as getCustomerExtraCardHoldersReducer } from './getCustomerExtraCardHolders';
import { reducer as getAccountPaymentTermsReducer } from './getAccountPaymentTerms';
import { reducer as getAccountLimitRaiseTermsReducer } from './getAccountLimitRaiseTerms';
import { reducer as updateCustomerAccountReducer } from './updateCustomerAccount';
import { reducer as updateCustomerAccountTransactionPartPaymentReducer } from './updateCustomerAccountTransactionPartPayment';
import { reducer as updateCustomerAccountCardReducer } from './updateCustomerAccountCard';
import { reducer as updateCustomerContactInfoReducer } from './updateCustomerContactInfo';
import { reducer as updateCustomerExtraCardHolderContactInfoReducer } from './updateCustomerExtraCardHolderContactInfo';

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
  updateCustomerContactInfoReducer,
  updateCustomerExtraCardHolderContactInfoReducer,
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

// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  deleteCustomerAccountPending: false,
  deleteCustomerAccountError: null,
  getCustomerAccountTermsPending: false,
  getCustomerAccountTermsError: null,
  getCustomerAccountPending: false,
  getCustomerAccountError: null,
  getCustomerAccountAllowedPartPaymentsPending: false,
  getCustomerAccountAllowedPartPaymentsError: null,
  getCustomerAccountBillsPending: false,
  getCustomerAccountBillsError: null,
  getCustomerAccountCampaignPurchasesPending: false,
  getCustomerAccountCampaignPurchasesError: null,
  getCustomerAccountCardsPending: false,
  getCustomerAccountCardsError: null,
  getCustomerAccountTransactionsPending: false,
  getCustomerAccountTransactionsError: null,
  getCustomerAccountsPending: false,
  getCustomerAccountsError: null,
  getCustomerExtraCardHoldersPending: false,
  getCustomerExtraCardHoldersError: null,
  getAccountPaymentTermsPending: false,
  getAccountPaymentTermsError: null,
  getAccountLimitRaiseTermsPending: false,
  getAccountLimitRaiseTermsError: null,
  updateCustomerAccountPending: false,
  updateCustomerAccountError: null,
  updateCustomerAccountTransactionPartPaymentPending: false,
  updateCustomerAccountTransactionPartPaymentError: null,
  updateCustomerAccountCardPending: false,
  updateCustomerAccountCardError: null,
  updateCustomerContactInfoPending: false,
  updateCustomerContactInfoError: null,
  updateCustomerExtraCardHolderContactInfoPending: false,
  updateCustomerExtraCardHolderContactInfoError: null,
};

export default initialState;

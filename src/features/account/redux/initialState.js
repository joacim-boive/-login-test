
// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
    accountTerms: {}, // TODO: array?
    account: {},
    accountAllowedPartPayments: [],
    accountBills: [],
    accountCampaignPurchases: [],
    accountCards: [],
    accountTransactions: [],
    accounts: [],
    accountPaymentTerms: {},
    accountLimitRaiseTerms: {},

    // generated
    deleteAccountPending: false,
    deleteAccountError: null,
    getAccountTermsPending: false,
    getAccountTermsError: null,
    getAccountPending: false,
    getAccountError: null,
    getAccountAllowedPartPaymentsPending: false,
    getAccountAllowedPartPaymentsError: null,
    getAccountBillsPending: false,
    getAccountBillsError: null,
    getAccountCampaignPurchasesPending: false,
    getAccountCampaignPurchasesError: null,
    getAccountCardsPending: false,
    getAccountCardsError: null,
    getAccountTransactionsPending: false,
    getAccountTransactionsError: null,
    getAccountsPending: false,
    getAccountsError: null,
    getAccountPaymentTermsPending: false,
    getAccountPaymentTermsError: null,
    getAccountLimitRaiseTermsPending: false,
    getAccountLimitRaiseTermsError: null,
    updateAccountPending: false,
    updateAccountError: null,
    updateAccountTransactionPartPaymentPending: false,
    updateAccountTransactionPartPaymentError: null,
    updateAccountCardPending: false,
    updateAccountCardError: null,
};

export default initialState;

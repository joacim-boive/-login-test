export const DELETE_ACCOUNT_URL = (customerId, referenceId) =>
    `/rest/customers/v1/${customerId}/accounts/${referenceId}`;

export const GET_ACCOUNT_LIMIT_RAISE_TERMS_URL = (country, lang) => `/rest/ess/v1/${country}/${lang}/terms/raise`;

export const GET_ACCOUNT_PAYMENT_TERMS_URL = (country, lang) => `/rest/ess/v1/${country}/${lang}/partpayments?amount`;

export const GET_ACCOUNTS_URL = customerId => `/rest/customers/v1/${customerId}/accounts`;

export const GET_ACCOUNT_ALLOWED_PART_PAYMENTS_URL = (customerId, referenceId) =>
    `/rest/customers/v1/${customerId}/accounts/${referenceId}/allowedpartpayments`;

export const GET_ACCOUNT_BILLS_URL = (customerId, referenceId) =>
    `/rest/customers/v1/${customerId}/accounts/${referenceId}/bills`;

export const GET_ACCOUNT_CAMPAIGN_PURCHASES_URL = (customerId, referenceId) =>
    `/rest/customers/v1/${customerId}/accounts/${referenceId}/campaignpurchases`;

export const GET_ACCOUNT_CARDS_URL = (customerId, referenceId) =>
    `/rest/customers/v1/${customerId}/accounts/${referenceId}/cards`;

export const GET_ACCOUNT_TERMS_URL = (customerId, refCode) =>
    `/rest/customers/v1/${customerId}/accounts/${refCode}/terms`;

export const GET_ACCOUNT_TRANSACTIONS_URL = (customerId, referenceId, offset, maxRecords) =>
    `/rest/customers/v1/${customerId}/accounts/${referenceId}/transactions?offset=${offset}&maxRecords=${maxRecords}`;

export const GET_ACCOUNT_URL = (customerId, refcode) => `/rest/customers/v1/${customerId}/accounts/${refcode}`;

export const UPDATE_ACCOUNT_CARD_URL = (customerId, referenceId) =>
    `/rest/customers/v1/${customerId}/accounts/cards/${referenceId} `;

export const UPDATE_ACCOUNT_TRANSACTION_PART_PAYMENT_URL = (customerId, referenceId, transactionId) =>
    `/rest/customers/v1/${customerId}/accounts/${referenceId}/transactions/${transactionId}/partpayments`;

export const UPDATE_ACCOUNT_URL = (customerId, referenceId) =>
    `/rest/customers/v1/${customerId}/accounts/${referenceId}`;

export const GET_CUSTOMER_URL = (customerId, updateFromCreditSystem) =>
    `/rest/customers/v1/${customerId}?update=${updateFromCreditSystem}`; // update=true => get data from ACSX + update NETX
export const GET_CUSTOMER_PROPERTIES_URL = (customerId, property) =>
    `/rest/customers/v1/${customerId}/properties?property=${property}&allowNoAccounts=true`; // allowNoAccounts=true => if customer has no accounts then let them in
export const GET_CUSTOMER_EXTRA_CARD_HOLDERS_URL = customerId => `/rest/customers/v1/${customerId}/extracardholders`;
export const UPDATE_CUSTOMER_CONTACT_INFO_URL = customerId => `/rest/customers/v1/${customerId}/contact`;
export const UPDATE_CUSTOMER_EXTRA_CARD_HOLDER_CONTACT_INFO_URL = customerId =>
    `/rest/customers/v1/${customerId}/extracardholders`;

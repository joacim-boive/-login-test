export const GET_CUSTOMER_URL = customerId => `/rest/customers/v1/${customerId}`;
export const GET_CUSTOMER_PROPERTIES_URL = (customerId, property) => `/rest/customers/v1/${customerId}/properties?property=${property}`;

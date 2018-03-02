export const GET_CUSTOMER_PROMISSORY_NOTES_URL = customerId => `/rest/customers/v1/${customerId}/promissorynotes`;

export const GET_ACTIVE_PROMISSORY_NOTE_CAMPAIGNS_URL = () => '/rest/ess/v1/SE/sv/promissorynotes/campaigns';

export const GET_PROMISSORY_NOTE_DEFAULT_PARAMETERS_URL = () => '/rest/ess/v1/SE/sv/promissorynotes/parameters';

export const GET_PROMISSORY_NOTE_PAYMENT_TERMS_URL = (paymentPeriodYear, makePaymentPlan) => `/rest/ess/v1/SE/sv/promissorynotes/terms?creditAmount&paymentPeriodYear=${paymentPeriodYear}&makePaymentPlan=${makePaymentPlan}`;

export const CREATE_CUSTOMER_PROMISSORY_NOTE_URL = customerId => `/rest/customers/v1/${customerId}/promissorynotes`;

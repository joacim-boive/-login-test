import { formatAmountCurrency } from '@ecster/ecster-util';

// TODO: get locale from redux state
export const formatAmount = (amount, currency = 'SEK', options = { strip00: true }) =>
    formatAmountCurrency(amount / 100, 'sv-SE', currency, options);

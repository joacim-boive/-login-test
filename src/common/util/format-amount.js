import { formatAmountCurrency } from '@ecster/ecster-util';

// TODO: get locale from redux state
export const formatAmount = (amount, currency = 'SEK', strip00 = true) =>
    formatAmountCurrency(amount, 'sv-SE', currency, strip00);

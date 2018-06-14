import { formatAmountCurrency } from '@ecster/ecster-util';

export const formatAmount = (amount, currency = 'SEK', zeroes = true) =>
    formatAmountCurrency(amount / 100, 'sv-SE', currency, zeroes);

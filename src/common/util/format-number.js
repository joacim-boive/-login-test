// TODO: get locale from redux state
export const formatNumber = (value, decimals = 2, locale = 'sv-SE') =>
    isNaN(value)
        ? ''
        : value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

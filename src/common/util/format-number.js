// TODO: get locale from redux state
export const formatNumber = (value, decimals = 2) =>
    isNaN(value)
        ? ''
        : value.toLocaleString('sv-SE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

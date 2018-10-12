export const formatMobileNumber = value =>
    isNaN(value) ? '' : value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5, 7) + ' ' + value.slice(7);

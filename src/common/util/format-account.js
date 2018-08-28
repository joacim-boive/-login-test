export const formatAccount = accountNumber =>
    accountNumber ? accountNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ') : '';

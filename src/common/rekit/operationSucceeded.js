/**
 * Check if an async rekit action's Pending state moves from true to false while the Error state is still undefined.
 *
 * The props objects must map the Pending and Error state properties.
 *
 * E.g.
 * if operation === getAccounts
 * then the props parameters must contain the getAccountsPending and getAccountsError state properties
 *
 * @param operation
 * @param prevProps
 * @param props
 * @return {*|boolean}
 */
export const operationSucceeded = (operation, prevProps, props) =>
    prevProps[`${operation}Pending`] && !props[`${operation}Pending`] && !props[`${operation}Error`];

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
    customer: { contactInformation: {} },
    customerExtraCardHolders: [],

    // generated
    getCustomerPending: false,
    getCustomerError: null,
    getCustomerPropertiesPending: false,
    getCustomerPropertiesError: null,
    getCustomerExtraCardHoldersPending: false,
    getCustomerExtraCardHoldersError: null,
    updateCustomerContactInfoPending: false,
    updateCustomerContactInfoError: null,
    updateCustomerExtraCardHolderContactInfoPending: false,
    updateCustomerExtraCardHolderContactInfoError: null,
};

export default initialState;

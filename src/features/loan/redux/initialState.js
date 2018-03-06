
// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
    customerPromissoryNote: {},
    customerPromissoryNotes: [],
    activePromissoryNoteCampaigns: [],
    promissoryNoteDefaultParameters: [],
    promissoryNotePaymentTerms: {},

    // generated
    getCustomerPromissoryNotesPending: false,
    getCustomerPromissoryNotesError: null,
    getActivePromissoryNoteCampaignsPending: false,
    getActivePromissoryNoteCampaignsError: null,
    getPromissoryNoteDefaultParametersPending: false,
    getPromissoryNoteDefaultParametersError: null,
    getPromissoryNotePaymentTermsPending: false,
    getPromissoryNotePaymentTermsError: null,
    createCustomerPromissoryNotePending: false,
    createCustomerPromissoryNoteError: null,
};

export default initialState;

import EcsterGA from '@ecster/ecster-analytics';

const app = 'msx';

// ACTION event
export const gaActionEvent = eventLabel => {
    EcsterGA.setEvent('action_button', app, 'click', eventLabel);
};

// GENERIC event
export const gaGenericEvent = eventLabel => {
    EcsterGA.setEvent('generic_event', app, 'click', eventLabel);
};

// SUBMIT event
export const gaSubmitEvent = eventLabel => {
    EcsterGA.setEvent('submit_form', app, 'click', eventLabel);
};

// PHONE event
export const gaPhoneEvent = eventLabel => {
    EcsterGA.setEvent('phonenumber_link', app, 'click', eventLabel);
};

// MAIL event
export const gaMailEvent = eventLabel => {
    EcsterGA.setEvent('email_link', app, 'click', eventLabel);
};

// DOWNLOAD event - download, view document
export const gaDownloadEvent = eventLabel => {
    EcsterGA.setEvent('download', app, 'click', eventLabel);
};

// HELP event - help links, foldout, view details etc
export const gaHelpEvent = eventLabel => {
    EcsterGA.setEvent('help_link', app, 'click', eventLabel);
};

// PAGE VIEWS
export const gaPageView = (pageUri, pageTitle) => {
    EcsterGA.setPageView(pageUri, pageTitle, true); // last param: send to GA
};

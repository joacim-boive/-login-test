export const CREATE_SESSION_URL = () => '/rest/sessions/v2';
export const DELETE_SESSION_URL = sessionKey => `/rest/sessions/v1/${sessionKey}`;
export const GET_SESSION_URL = sessionKey => `/rest/sessions/v2/${sessionKey}`;

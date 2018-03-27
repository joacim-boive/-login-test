// Copied from Dashboard X, src/util/api.js
// todo: @ecster node modules?

import Ajax from '@ecster/ecster-net/lib/Ajax';
import Session from '@ecster/ecster-net/lib/Session';

const successHandler = (xhr, body) => Promise.resolve(body);
const errorHandler = (xhr, body) => Promise.reject(body);

const addQueryParams = (url, queryParams = []) =>
    `${url}?${Object.keys(queryParams)
        .map(key => queryParams[key] && `${key}=${queryParams[key]}&`)
        .join('')
        .replace(/&$/, '')
        .replace(/\?$/, '')}`; // Remove trailing & and ?


export const post = (url, data) =>
    Ajax
        .post({ url }, data)
        .then(successHandler)
        .catch(errorHandler);

export const put = (url, data) =>
    Ajax
        .put({ url }, data)
        .then(successHandler)
        .catch(errorHandler);

export const get = (url, queryParams) =>
    Ajax
        .get({ url: addQueryParams(url, queryParams) })
        .then(successHandler)
        .catch(errorHandler);

export const del = (url, data) =>
    Ajax
        .delete({ url }, data)
        .then(successHandler)
        .catch(errorHandler);

export const setHeaders = (sessionKey) => {
    Session.set('origin', 'mypages');
    Session.set('sessionKey', sessionKey);
};

// export const findErrorText = (e) => {
//     const jsonResponse = JSON.parse(e.response);
//
//     if (jsonResponse && jsonResponse.detail) {
//         return jsonResponse.detail;
//     }
//
//     return 'Okänt fel uppstod';
// };

const BASE_URL = 'https://www.netigate.se/a/s.aspx?s=632612X139591763X13679';

// to enhance readability in encoded string, replace some chars with '' or '-', then remove double --
const READABLE_UA = encodeURIComponent(
    window.navigator.userAgent
        .replace(/[()]/g, '')
        .replace(/[ /;,]/g, '-')
        .replace(/--+/g, '-')
);

export const SURVEY_URL = `${BASE_URL}&eid=${READABLE_UA}`;

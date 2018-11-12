const loadFont = fontName => {
    // const link = document.createElement('link');

    // Only fetch these characters to keep the font-size down.
    // https://developers.google.com/fonts/docs/getting_started
    // https://www.sitepoint.com/joy-of-subsets-web-fonts/
    // link.href = `//fonts.googleapis.com/css?family=${fontName.replace(/ /g, '+')}`;
    // link.rel = 'stylesheet';
    // link.addEventListener('load', () => {
    document.body.classList.add('font-loaded');
    // });

    // document.head.appendChild(link);
};

export default loadFont;

window.cordovaApp = true;
// window.GAConf = {basePath: 'ecster', id: 'UA-72858010-2', v: '1487870554077', env: 'dev'};

window.ecsterAppConfig = {
    // TODO: How..? Webpack?
    ajaxBaseUrl: 'https://secure.ecster.se',
    // basePath: 'ecster',
};

// cordova generated + modified
const app = {
    initialize() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady() {
        console.log('Received deviceready event');
        // initApplication defined in src/index.js
        if (window.initApplication) {
            window.initApplication();
        }
    },
};

app.initialize();

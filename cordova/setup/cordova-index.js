(function() {
    function onDeviceReady() {
        // initApplication defined in src/index.js
        if (window.EcsterConfig.init) {
            window.EcsterConfig.init();
        }
    }

    document.addEventListener('deviceready', onDeviceReady, false);
})();

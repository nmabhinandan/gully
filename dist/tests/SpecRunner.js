define(['exports', 'spec/testSuite'], function (exports, _specTestSuite) {
    // RequireJS configuration
    'use strict';

    require.config({
        baseUrl: 'dist/tests',
        urlArgs: 'cb=' + Math.random(),

        paths: {
            spec: 'spec' },

        hbs: {
            disableI18n: true
        }
    });

    // run mocha
    (function () {
        require(_specTestSuite.testSuite.specs, function () {

            if (window.mochaPhantomJS) {
                mochaPhantomJS.run();
            } else {
                mocha.run();
            }
        });
    })();
});
// lives in the test directory
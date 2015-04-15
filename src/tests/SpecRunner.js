// RequireJS configuration
require.config({
    baseUrl: '/dist/tests',
    urlArgs: 'cb=' + Math.random(),


    paths: {
        spec: 'spec', // lives in the test directory
    },

    hbs: {
        disableI18n: true
    }
});


import {testSuite} from 'spec/testSuite';

// run mocha
(function() {
    require(testSuite.specs, function() {

        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        } else {
            mocha.run();
        }
        
    });
})();
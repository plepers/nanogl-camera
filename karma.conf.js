// Karma configuration
// Generated on Sat Dec 19 2015 12:50:43 GMT+0100 (CET)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha'],


    // list of files / patterns to load in the browser
    files: [
      'test/*.js'
    ],



    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      "transform": [["babelify", { "presets": ["@babel/preset-env"] }]]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],//, 'Firefox', 'Safari'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,


    // SL and travis config
    sauceLabs: {
      startConnect: true,
      testName: 'nanogl-camera unit tests'
    },

    // define SL browsers
    customLaunchers: {
      'SL_Chrome78_OSX10_13': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '78.0',
        platform: 'macOS 10.13'
      },
      'SL_Firefox70_OSX10_13': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '70.0',
        platform: 'macOS 10.13'
      },
      'SL_Safari_12': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'macOS 10.14',
        version: '12.0'
      },

      //Win 8.1
      'SL_Chrome78_WIN10': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '78.0',
        platform: 'Windows 10',
      },


      'SL_Chrome65_WIN10': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '65.0',
        platform: 'Windows 10',
      },

      'SL_win10_Edge': {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        platform: 'Windows 10',
        version: '18.17763'
      },

      'SL_win10_FF': {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 10',
        version: '70.0'
      }
    },
  });

  if (process.env.TRAVIS) {

    var browsers = [];
    for (var browser in config.customLaunchers) {
      browsers.push(browser);
    }
    config.browsers = browsers;

    config.autoWatch = false;
    config.singleRun = true;

  }
};

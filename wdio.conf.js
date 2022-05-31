const path = require('path');
const fs = require('fs');

const WDIO_APPIUM_LOG = path.resolve(process.cwd(), 'wdio-appium.log');
const ALLURE_RESULTS_DIR = path.resolve(process.cwd(), 'allure-results');
const ALLURE_REPORT_DIR = path.resolve(process.cwd(), 'allure-report');

const removePathContent = (expectedPath) => {
  if (fs.existsSync(expectedPath)) {
    fs.rmSync(expectedPath, {recursive: true});
  }
}

exports.config = {
  // ====================
  // Runner Configuration
  // ====================
  port: 4723,

  // ==================
  // Specify Test Files
  // ==================
  specs: ['./features/**/*.feature'],
  exclude: [],

  // ============
  // Capabilities
  // ============
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      platformName: 'Android',
      deviceName: 'emulator-5554',
      appPackage: 'com.experitest.ExperiBank',
      appActivity: '.LoginActivity',
      browserName: ''
    }
  ],

  // ===================
  // Test Configurations
  // ===================
  logLevel: 'error',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  services: [
    [
      'appium', {
        args: {
          address: 'localhost',
          port: 4723
        },
        logPath: './'
      }
    ]
  ],
  framework: 'cucumber',
  reporters: [
    [
      'allure', {
        outputDir: ALLURE_RESULTS_DIR,
        disableWebdriverStepsReporting: true
      }
    ]
  ],
  cucumberOpts: {
    require: ['./features/step-definitions/**/*.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: true,
    tagExpression: 'not @WIP',
    timeout: 60000,
    ignoreUndefinedDefinitions: false
  },

  // =====
  // Hooks
  // =====
  onPrepare: function (config, capabilities) {
    removePathContent(WDIO_APPIUM_LOG);
    removePathContent(ALLURE_RESULTS_DIR);
    removePathContent(ALLURE_REPORT_DIR);
  },

  // Cucumber Hooks
  afterScenario: async function (world, result, context) {
    driver.reset();
  }
}

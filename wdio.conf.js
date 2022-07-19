const path = require('path');
const fs = require('fs');

const { generate } = require("multiple-cucumber-html-reporter");
const cucumberJson = require("wdio-cucumberjs-json-reporter").default;

const WDIO_APPIUM_LOG = path.resolve(process.cwd(), 'wdio-appium.log');
const REPORT_DIR = path.resolve(process.cwd(), "reports");
const JSON_REPORT_DIR = path.resolve(REPORT_DIR, "json");
const HTML_REPORT_DIR = path.resolve(REPORT_DIR, "html");
const HTML_REPORT_TITLE = "WDIO POC - Mobile automation";

const removePathContent = (expectedPath) => {
  if (fs.existsSync(expectedPath)) {
    fs.rmSync(expectedPath, { recursive: true });
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
      "cucumberjs-json",
      {
        jsonFolder: JSON_REPORT_DIR,
        language: "en",
      },
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
    removePathContent(REPORT_DIR);
  },

  onComplete: () => {
    // Generate the report when it all tests are done

    if (fs.existsSync(JSON_REPORT_DIR)) {
      generate({
        jsonDir: JSON_REPORT_DIR,
        reportPath: HTML_REPORT_DIR,
        pageTitle: HTML_REPORT_TITLE,
        reportName: HTML_REPORT_TITLE,
        displayDuration: true,
        displayReportTime: true,
      });
    }
  },

  // Cucumber Hooks
  beforeFeature: function (uri, feature) {
    console.log(`FEATURE: ${feature.name}`);
  },

  beforeScenario: function (world, context) {
    console.log(`\nSCENARIO: ${world.pickle.name}`);
  },

  beforeStep: function (step, scenario, context) {
    console.log(`STEP: ${step.keyword}${step.text}`);
  },

  afterStep: function (step, scenario, result, context) {
    if (result.passed === false) {
      return driver.takeScreenshot().then(function (screenShot) {
        cucumberJson.attach(screenShot, "image/png");
      });
    }
  },

  // Cucumber Hooks
  afterScenario: async function (world, result, context) {
    driver.reset();
    await driver.pause(2000);
  }
}

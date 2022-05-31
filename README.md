# README #

**Table of content**

* [Repository description](#repository-description)
* [Environment setup](#environment-setup)
* [Available npm commands](#available-npm-commands)

___

## Repository description

The objective of this repository is to describe how is possible:
* To have mobile test automated using `webdriverIO` and `Cucumber` framework and `Appium` libraries.

## Environment setup

* Install **Android Studio**
  * [Android Studio](https://developer.android.com)

* Install **Android SDK**
  * [Android SDK](https://developer.android.com/studio/#downloads)
  * Create a new Android Studio Project with default settings for *API 30(Or Desired API)* and *No Activity*.
  * Continue to import and install any settings suggested by the SDK.

* Install **node modules**
  * Make sure you have installed node (**node version should be 16 or higher**).
  * After clonning the repository run: `npm install`

* (Optional) Install **Appium** & **Appium inspector**: 
These tools will help to find the locators of the different elements for development
  * [Appium](https://appium.io/)
  * [Appium inspector](https://github.com/appium/appium-inspector)

## Available npm commands 

### Pre conditions: Before running the framework

* Run the **android emulator**:
  * Open the "Android Studio" app.
  * Tools -> Device manager -> Create device
  * Run the device after it is created

* Install **EriBank application** on the emulator:
  * Download EriBank apk from: https://experitest.s3.amazonaws.com/eribank.apk
  * Drag and drop the apk into the emulator

**IMPORTANT**: Be sure that the emulator ID is `emulator-5554`(default one). If not, update the `capabilities` of the wdio config file (See [wdio.conf.js](./wdio.conf.js)).
* To check the list of attached devices, run in a terminal: `adb devices`

### Commands

The available npm commands are defined in [package.json](package.json)

To run any of the commands, execute from a terminal:

```bash 
npm run <command>
```

For example, to run all the test cases defined in the suit, execute:
```bash 
npm run test
```

The available commands are:

* `test`: To run all the test cases locally
* `report`: To generate an `html` report based on the content of `allure-results` folder. The results foder is generated each time you run the suite. Note: This report shall be improved.

#### How to run only the test case you are working on

After wirting the new scenario, you can add a unique tag temporary to that test case, for example `@test`.

Then you can run the following command to only execute the test case you are working on:

```bash 
npm test -- --cucumberOpts.tagExpression='@test'
```

#### How to change the suite log level

The default log level is `error`. Execute the following command to change the suite log level:

```bash 
npm test -- --logLevel info
```

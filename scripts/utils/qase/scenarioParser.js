
const fs = require("fs");
const path = require("path");

const { JSON_REPORT_DIR } = require("../../../wdio.conf");

const Status = {
  PASSED: "passed",
  FAILED: "failed",
  SKIPPED: "skipped",
};

const StepStatus = Status;
const ScenarioStatus = Status;

const FeatureAttr = {
  ELEMENTS: "elements",
};

const StepAttr = {
  RESULT: "result",
  STATUS: "status",
  DURATION: "duration",
  ERROR_MESSAGE: "error_message",
};

const ScenarioAtt = {
  STATUS: "status",
  NAME: "name",
  TAGS: "tags",
  STEPS: "steps",
};

const QaseScenarioAtt = {
  STATUS: [ScenarioAtt.STATUS],
  NAME: [ScenarioAtt.NAME],
  QASE_ID: "qaseId",
  DURATION: "duration",
  ERROR: "error",
};

const getScenariosFromCucumberJsonDir = () => {
  const jsonFileNames = fs
    .readdirSync(JSON_REPORT_DIR)
    .filter((currentFileName) => {
      return currentFileName.indexOf(".json") > -1;
    });

  let scenarios = [];
  let jsonFileContent;
  jsonFileNames.forEach((jsonFileName) => {
    jsonFileContent = JSON.parse(
      fs.readFileSync(path.join(JSON_REPORT_DIR, jsonFileName))
    );
    if (jsonFileContent?.[0] && FeatureAttr.ELEMENTS in jsonFileContent[0]) {
      scenarios = scenarios.concat(jsonFileContent[0][FeatureAttr.ELEMENTS]);
    }
  });
  return scenarios;
};

const getQaseIdFromScenarioTags = (scenarioTags) => {
  const regex = /@[Qq]-*(\d+)/;
  return (
    scenarioTags
      .filter((tagInfo) => regex.test(tagInfo.name))
      .map((tagInfo) => regex.exec(tagInfo.name)[1])?.[0] || null
  );
};

const getQaseScenarioDataFromStepResults = (scenarioSteps) => {
  let scenarioData = {
    [QaseScenarioAtt.DURATION]: 0.0,
    [QaseScenarioAtt.STATUS]: ScenarioStatus.SKIPPED,
    [QaseScenarioAtt.ERROR]: "",
  };

  let passedCount = 0;
  let stepResult;

  scenarioSteps.every((step) => {
    scenarioData[QaseScenarioAtt.DURATION] =
      scenarioData[QaseScenarioAtt.DURATION] +
        stepResult?.[StepAttr.DURATION] || 0.0;
    stepResult = step[StepAttr.RESULT];
    if (stepResult[StepAttr.STATUS] == StepStatus.PASSED) {
      passedCount++;
    } else if (stepResult[StepAttr.STATUS] == StepStatus.FAILED) {
      scenarioData[QaseScenarioAtt.STATUS] = ScenarioStatus.FAILED;
      scenarioData[QaseScenarioAtt.ERROR] =
        stepResult?.[StepAttr.ERROR_MESSAGE] || "";
      return false;
    }
    return true;
  });

  if (passedCount === scenarioSteps.length) {
    scenarioData[QaseScenarioAtt.STATUS] = ScenarioStatus.PASSED;
  }
  // Nanoseconds to Milliseconds
  scenarioData[QaseScenarioAtt.DURATION] =
    scenarioData[QaseScenarioAtt.DURATION] / 1000000;
  return scenarioData;
};

const getQaseSceanrios = () => {
  let scenarios = getScenariosFromCucumberJsonDir();
  let qaseScenarios = [];
  let qaseId;
  let scenarioData;
  scenarios.forEach((scenario) => {
    qaseId = getQaseIdFromScenarioTags(scenario[ScenarioAtt.TAGS]);
    if (!qaseId) {
      console.log(
        `WARNING: Scenario '${
          scenario[ScenarioAtt.NAME]
        }' does not have a QASE identifier in its tags`
      );
    } else {
      scenarioData = getQaseScenarioDataFromStepResults(
        scenario[ScenarioAtt.STEPS]
      );
      qaseScenarios.push({
        [QaseScenarioAtt.NAME]: scenario[ScenarioAtt.NAME],
        [QaseScenarioAtt.QASE_ID]: parseInt(qaseId),
        [QaseScenarioAtt.STATUS]: scenarioData[QaseScenarioAtt.STATUS],
        [QaseScenarioAtt.DURATION]: scenarioData[QaseScenarioAtt.DURATION],
        [QaseScenarioAtt.ERROR]: scenarioData[QaseScenarioAtt.ERROR],
      });
    }
  });
  return qaseScenarios;
};

module.exports = {
  getQaseSceanrios,
  QaseScenarioAtt,
  ScenarioStatus,
};

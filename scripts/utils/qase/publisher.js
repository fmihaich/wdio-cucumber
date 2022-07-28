const qase = require("qaseio");
const child_process = require("child_process");

const { QaseScenarioAtt } = require("./scenarioParser");
const qaseConfig = require("./qase.json");

const createHeaders = () => {
  const { version: nodeVersion, platform: os, arch } = process;
  const npmVersion = child_process
    .execSync("npm -v", { encoding: "utf8" })
    .replace(/['"\n]+/g, "");
  const xPlatformHeader = `node=${nodeVersion};npm=${npmVersion};os=${os};arch=${arch}`;
  return {
    "X-Platform": xPlatformHeader,
  };
};

const publishQaseResult = (qaseScenarios, runId) => {
  let qaseApi = new qase.QaseApi(
    qaseConfig.apiToken,
    qaseConfig.basePath,
    createHeaders()
  );

  qaseScenarios.forEach((qaseScenario) => {
    qaseApi.results
      .createResult(qaseConfig.projectCode, parseInt(runId), {
        status: qaseScenario[QaseScenarioAtt.STATUS],
        case_id: qaseScenario[QaseScenarioAtt.QASE_ID],
        time_ms: qaseScenario[QaseScenarioAtt.DURATION],
        stacktrace: qaseScenario[QaseScenarioAtt.ERROR],
        comment: qaseScenario[QaseScenarioAtt.ERROR]
          ? qaseScenario[QaseScenarioAtt.ERROR].split("\n")[0]
          : undefined,
      })
      .then((res) => {
        const scenarioId = res?.data?.result?.case_id || "";
        if (res?.data?.status == true) {
          console.log(
            `SUCCESS: The result of the scenario "${scenarioId}" was published in the run ID "${runId}"`
          );
        } else {
          console.log(
            `WARNING: The result of the scenario "${scenarioId}" could not be published in the run ID "${runId}"`
          );
        }
      })
      .catch((err) => {
        console.log(
          `ERROR: The result of the scenario was NOT published in the run ID "${runId}"`
        );
        console.log(`\t- ${err.message}`);
      });
  });
};

module.exports = {
  publishQaseResult,
};


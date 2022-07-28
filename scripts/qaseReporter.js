const { getQaseSceanrios } = require("./utils/qase/scenarioParser");
const { publishQaseResult } = require("./utils/qase/publisher");

const { argv } = require("yargs")
  .option("runId", {
    description: "Qase run id",
    demandOption: true,
  })
  .option("verbose", {
    type: "boolean",
    default: false,
    description: "Enable command console log",
  })
  .usage("Script to publish Suite result in QASE");

const main = () => {
  let { runId, verbose } = argv;
  console.log(
    `**** Publishing suite results in the QASE run Id "${runId}" ****\n`
  );
  const qaseSceanrios = getQaseSceanrios();
  if (verbose) {
    console.log(JSON.stringify(qaseSceanrios, null, 2));
  }
  publishQaseResult(qaseSceanrios, runId);
};

main();

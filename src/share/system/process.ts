const util = require('util');
const exec = util.promisify(require('child_process').exec);


export const generateTrainingNotebook = async () => {
    await exec('bash ./src/share/system/bash/execute_jupyter_training.sh')
};

export const generateMetricsNotebook = async () => {
    await exec('bash ./src/share/system/bash/execute_jupyter_metrics.sh')
};

export const generateVisualNotebook = async () => {
    await exec('bash ./src/share/system/bash/execute_jupyter_visual.sh')
};

export const initPythonEnv = async () => {
    await exec('bash ./src/share/system/bash/init_python_env.sh')
    console.log(">>> Python environment initialized <<<")
}
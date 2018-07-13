const { spawn } = require("child_process");

const handlePrompt = require("./handlePrompt");

const TIMEOUT = 20 * 1000;
const USERNAME_PROMPT = "Username:";
const PASSWORD_PROMPT = "Password:";
const EMAIL_PROMPT = "Email:";
const SUCCESS_MESSAGE = "Logged in as";

function throwAfterTimeout(reject) {
  return setTimeout(() => {
    reject(new Error("process timed out"));
  }, TIMEOUT);
}

async function npmLogin(NPM_USER, NPM_PASS, NPM_EMAIL) {
  const _process = spawn("npm", ["login"]);

  const prompts = [
    { prompt: USERNAME_PROMPT, response: NPM_USER },
    { prompt: PASSWORD_PROMPT, response: NPM_PASS },
    { prompt: EMAIL_PROMPT, response: NPM_EMAIL }
  ];

  return new Promise((resolve, reject) => {
    const timeout = throwAfterTimeout(reject);

    _process.stdout.on("data", data => {
      const stdout = data.toString();

      handlePrompt(stdout, _process.stdin, prompts);

      if (stdout.includes(SUCCESS_MESSAGE)) {
        _process.stdin.end();
      }
    });

    _process.on("close", (code, signal) => {
      clearTimeout(timeout);
      resolve(code);
    });
  });
}

module.exports = npmLogin;

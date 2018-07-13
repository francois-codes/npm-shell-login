#!/usr/bin/env node

const logger = require("./src/logger");
const npmLogin = require("./src/npmLogin");
const checkCredentials = require("./src/checkCredentials");
const hidePassword = require("./src/hidePassword");
const getNPMToken = require("./src/getNPMToken");

async function run() {
  logger.welcome("npm-shell-login", "You'll be logged in to npm in no time");

  const { NPM_USER, NPM_PASS, NPM_EMAIL } = process.env;

  try {
    checkCredentials(NPM_USER, NPM_PASS, NPM_EMAIL);
  } catch (e) {
    logger.error(
      `Missing credentials
      make sure you have NPM_USER, NPM_PASS and NPM_EMAIL defined in your env vars`,
      e
    );
  }

  logger.startStep("Running npm login with :");
  logger.log(`username: ${NPM_USER}`);
  logger.log(`password: ${hidePassword(NPM_PASS)}`);
  logger.log(`email: ${NPM_EMAIL}`);

  try {
    const code = await npmLogin(NPM_USER, NPM_PASS, NPM_EMAIL);

    if (code === 0) {
      logger.success(`Successfully loggedIn as ${NPM_USER}!`);
      const npmToken = await getNPMToken();
      logger.log(`Here's your token: ${npmToken}`);
      logger.log("Use it well !");
    } else {
      logger.warn("Process returned non-zero exit code");
      logger.warn("please check your credentials and your connectivity");
    }

    process.exit(code);
  } catch (e) {
    logger.error("Something went wrong :s \u{1f616}", e);
    process.exit(1);
  }
}

run();

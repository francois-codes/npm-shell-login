#!/usr/bin/env node

const getNPMToken = require("./src/getNPMToken");

async function run() {
  const npmToken = await getNPMToken();
  console.log(npmToken);
}

run();

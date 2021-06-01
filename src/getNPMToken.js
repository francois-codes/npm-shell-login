const { readFile } = require("fs");
const { promisify } = require("util");
const { split, head, last, compose, toString } = require("ramda");

const readFileAsync = promisify(readFile);

const BREAK_LINE = "\n";
const TOKEN_SEPARATOR = "=";

async function getNPMToken() {
  try {
    const fileBuffer = await readFileAsync(`${process.env.HOME}/.npmrc`);
    const lines = compose(
      split(BREAK_LINE),
      toString
    )(fileBuffer);

    const token = compose(
      last,
      split(TOKEN_SEPARATOR),
      head
    )(lines);

    return token;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = getNPMToken;

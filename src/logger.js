/**
 * module Logger
 * @module @applicaster/zapplicaster-cli/utils/logger
 * Outputs messages to the console when running tasks;
 */

const chalk = require("chalk");
const { inspect } = require("util");
const { curry, map, unless, is, either } = require("ramda");
const { name, version } = require("../package.json");

/**
 * Displays a welcome message when a script starts
 * @param {String} script : name of the script
 * @param {String?} message : optional message to print when the script starts
 */
function welcome(script, message) {
  console.log("\n\u{1F527} ", chalk.blue.bold(` ${name} - v${version}`));
  console.log("\n\u{1F525} ", chalk.magenta(` Running ${script}`));
  if (message) {
    console.log(chalk.gray(message));
  }
  console.log(chalk.gray("--"));
}

/**
 * Logs a message or an array of messages
 * @param {String[]} messages: message or messages to be printed to the console
 */
function log(...messages) {
  console.log(...map(unless(either(is(String), is(Number)), inspect), messages));
}

/**
 * Prints an error message (optionaly with a stacktrace) then exits the program
 * This function is curried and can be invoked with partial application
 * @param {String} message : error message to display
 * @param {Object} error: Error object related to the error
 */
const error = curry(function(message, error) {
  console.error("\u274c ", chalk.bgRed.white(message));
  if (error && error.stack) {
    console.error(chalk.red(error.stack));
  }
  if (process.env.NODE_ENV !== "test") {
    process.exit(process.exitCode || 1);
  }
});

/**
 * Prints a warning message in the console
 * @param {String[]} messages: message or messages to be printed to the console
 */
function warn(...messages) {
  console.warn("\u26A0 ", chalk.yellow(...messages));
}

/**
 * Prints a message related to the start of a new step in the task
 * @param {String} message : message to be printed to the console
 */
function startStep(...message) {
  console.log("\n\u{1F680} ", chalk.cyan(...message));
}

/**
 * Prints a message related to the end of a step in the task
 * @param {String} message : message to be printed to the console
 */
function endStep(...message) {
  console.log("\u2714 ", chalk.green(map(unless(either(is(String), is(Number)), inspect), message)));
}

/**
 * Prints a success message indicating that an operation has succeeded
 * @param {any} message : message to be displayed in the console
 */
function success(...message) {
  console.log("\n\u{1F389} ", chalk.green(...message));
}

module.exports = {
  welcome,
  log,
  error,
  warn,
  startStep,
  endStep,
  success
};

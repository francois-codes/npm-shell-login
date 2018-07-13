/**
 * @typedef {Object} prompt Object representing a prompt message to watch for,
 * and the response to provide when it lands in stdin
 * @typedef {String} prompt.prompt : message to watch for
 * @typedef {String} prompt.response : text to enter in response to the prompt
 */

/**
 * handles a cli prompt, and provides the proper answer
 * @param {String} stdout of the node process
 * @param {String} stdin to write into
 * @param {Array<prompt>} prompts array of prompts to handle
 */
function handlePrompt(stdout, stdin, prompts) {
  [...prompts].forEach(({ prompt, response }) => {
    if (stdout.includes(prompt)) {
      stdin.write(`${response}\n`);
    }
  });
}

module.exports = handlePrompt;

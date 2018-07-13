const { mapObjIndexed } = require("ramda");

function checkCredential(value, key) {
  if (!value) {
    throw new Error(`${key} is undefined`);
  }
}

function checkCredentials(username, password, email) {
  mapObjIndexed(checkCredential, { username, password, email });
}

module.exports = checkCredentials;

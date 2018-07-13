const { compose, join, times, always, length, __ } = require("ramda");

const hidePassword = compose(
  join(""),
  times(always("*"), __),
  length
);

module.exports = hidePassword;

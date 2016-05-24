'use strict';

const R = require('ramda');

const engine = () => {

  const push = R.identity;
  const expression = R.identity;

  return {
    push,
    expression
  };
};

module.exports = engine;

'use strict';

const R = require('ramda');

const engine = () => {

  const pushCmd = R.identity;

  const toString = R.identity;
  const toFlatArray = R.identity;
  const toFlatArrayExp = R.identity;
  const toDeepArrayExp = R.identity;

  return {
    pushCmd,
    toString,
    toFlatArray,
    toFlatArrayExp,
    toDeepArrayExp
  };
};

module.exports = engine;

'use strict';

const R = require('ramda');

const engine = () => {

  const instance = function () {

    this.cmdBuffer = [];

    this.pushCmd = function (cmd) {
      const self = this;
      cmd.split('').filter(c => c.trim().length > 0).forEach(c => self.cmdBuffer.push(c));
      return this;
    };

    this.toString = function () {
      return this.cmdBuffer.join('');
    };

    this.toFlatArray = R.identity;

    this.toFlatArrayExp = R.identity;

    this.toDeepArrayExp = R.identity;

  };

  return new instance();
};

module.exports = engine;

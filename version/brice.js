'use strict';

const R = require('ramda');

const engine = () => {

  const isNumber = x => String(Number(x)) === x;

  const instance = function () {

    this.cmdBuffer = [];

    this.pushCmd = function (cmd) {
      if (cmd === 'C') {
        this.cmdBuffer.splice(0, this.cmdBuffer.length);
        return this;
      }
      const chars = cmd.split('')
        .filter(c => c.trim().length > 0);
      while (chars.length > 0) {
        let c = chars.shift();
        if (chars[0] === '.') {
          c += chars.shift();
          while (isNumber(chars[0]))
            c += chars.shift();
        }
        if (isNumber(c))
          c = Number(c);
        this.cmdBuffer.push(c);
      }
      return this;
    };

    this.toString = function () {
      return this.cmdBuffer.join('');
    };

    this.toFlatArray = function () {
      return this.cmdBuffer;
    };

    this.toDeepArray = R.identity;

  };

  return new instance();
};

module.exports = engine;

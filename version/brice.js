'use strict';

const R = require('ramda');

const engine = () => {

  const isNumber = x => String(Number(x)) === x;

  const containsArray = arr => {
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]))
        return true;
    }
    return false;
  };

  const calculateFlatArray = arr => {
    let priorIndex = ((arr.indexOf('x') + 1) || (arr.indexOf('/') + 1)) - 1;
    if (priorIndex === -1)
      return arr.reduce((acc, c) => {
        const accIsNumber = typeof(acc) === 'number';
        if (typeof(c) === 'number')
      }, 0);
    //TODO
  };

  const calculate = arr => {
    //TODO
    return 0;
  };

  const instance = function () {

    this.cmdBuffer = [];

    this.pushCmd = function (cmd) {
      if (cmd === '=')
        return calculate(this.toDeepArray());
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

    this.toDeepArray = function (chars) {
      chars = chars || this.cmdBuffer.slice();
      const arr = [];
      const parenthesis = '()'.split('');
      while (chars.length > 0) {
        const c = chars.shift();
        if (parenthesis.indexOf(c) === -1) {
          arr.push(c);
          continue;
        }
        if (c === parenthesis[0]) {
          arr.push(this.toDeepArray(chars));
          continue;
        }
        if (c === parenthesis[1])
          break;
      }
      return arr;
    }

  };

  return new instance();
};

module.exports = engine;

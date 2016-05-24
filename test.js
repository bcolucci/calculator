'use strict';

const should = require('should');

const test = version => {

  const Calculator = () => require('./calculator')(version);

  console.log('Test version:', version);

  describe('calculator', () => {

    it('should push commands as char', () => {
      const calculator = Calculator();
      calculator.toString().should.be.deepEqual(''); // default value
      calculator.pushCmd('1').pushCmd('+').pushCmd('2');
      calculator.toString().should.be.deepEqual('1+2');
    });

    it('should push commands as string', () => {
      const calculator = Calculator();
      calculator.pushCmd('1 - 2');
      calculator.toString().should.be.deepEqual('1-2');
    });

    it('should clear', () => {
      const calculator = Calculator();
      calculator.pushCmd('1 + 3');
      calculator.toString().should.be.deepEqual('1+3');
      calculator.pushCmd('C').toString().should.be.deepEqual('');
    });

    it('should render as array (simple)', () => {
      const calculator = Calculator();
      calculator.pushCmd('1 / 2.5');
      calculator.toFlatArray().should.be.deepEqual([ 1, '/', 2.5 ]);
    });

    it('should render as flat array (complexe)', () => {
      const calculator = Calculator();
      calculator.pushCmd('(1 + 2.2 x (1 - 4.7 / 2)) / 3.1 + 5');
      calculator.toFlatArray().should.be.deepEqual([ '(', 1, '+', 2.2, 'x', '(', 1, '-', 4.7, '/', 2, ')', ')', '/', 3.1, '+', 5 ]);
    });

    it('should render as deep array (complexe)', () => {
      const calculator = Calculator();
      calculator.pushCmd('(1 + 2.2 x (1 - 4.7 / 2)) / 3.1 + 5');
      calculator.toDeepArray().should.be.deepEqual([ [ 1, '+', 2.2, 'x', [ 1, '-', 4.7, '/', 2 ] ], '/', 3.1, '+', 5 ]);
    });

    it('should calculate', () => {
      const calculator = Calculator();
      calculator.pushCmd('1 / (1 + 2.2)');
      calculator.pushCmd('=').should.be.deepEqual(0.3125);
    });

  });
    
};

test('brice');
//test('arnaud');

'use strict';

const should = require('should');

const test = version => {

  const calculator = require('./calculator')(version);

  console.log('Test version:', version);

  describe('calculator', () => {

    it('should push commands as char', () => {
      calculator.toString().should.be.deepEqual(''); // default value
      calculator.pushCmd('1').pushCmd('+').pushCmd('2');
      calculator.toString().should.be.deepEqual('1+2');
    });

    it('should push commands as string', () => {
      calculator.pushCmd('1 - 2');
      calculator.toString().should.be.deepEqual('1-2');
    });

    it('should clear', () => {
      calculator.pushCmd('1 + 3');
      calculator.toString().should.be.deepEqual('1+3');
      calculator.pushCmd('C').toString().should.be.deepEqual('');
    });

    it('should render as array (simple)', () => {
      calculator.pushCmd('1 / 2.5');
      calculator.toFlatArray().should.be.deepEqual([ 1, '/', 2.5 ]);
    });

    it('should render as flat array (complexe)', () => {
      calculator.pushCmd('(1 + 2.2 x (1 - 4.7 / 2)) / 3.1 + 5');
      calculator.toFlatArrayExp().should.be.deepEqual([ '(', 1, '+', 2.2, 'x', '(', 1, '-', 4.7, '/', 2, ')', ')', '/', 3.1, '+', 5 ]);
    });

    it('should render as deep array (complexe)', () => {
      calculator.pushCmd('(1 + 2.2 x (1 - 4.7 / 2)) / 3.1 + 5');
      calculator.toDeepArrayExp().should.be.deepEqual([ [ 1, '+', 2.2, 'x', [ 1, '-', 4.7, '/', 2 ] ], '/', 3.1, '+', 5 ]);
    });

    it('should calculate', () => {
      calculator.pushCmd('1 / (1 + 2.2)');
      calculator.pushCmd('=').should.be.deepEqual(0.3125);
    });

  });
    
};

test('brice');
test('arnaud');

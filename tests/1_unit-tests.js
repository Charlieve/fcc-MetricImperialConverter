const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){    
    test('whole number input', function(done){
      let input = '10L';
      assert.equal(convertHandler.getNum(input),10);
      done();
    })
    
    test('decimal number input', function(done){
      let input = '0.5L';
      assert.equal(convertHandler.getNum(input),0.5);
      done();
    })
    
    test('fractional input', function(done){
      let input = '1/2L';
      assert.equal(convertHandler.getNum(input),0.5);
      done();
    })
    
    test('fractional input with a decimal', function(done){
      let input = '1/0.5L';
      assert.equal(convertHandler.getNum(input),2);
      done();
    })
    
    test('error on a double-fraction', function(done){
      let input = '1/2/3L';
      assert.equal(convertHandler.getNum(input),'invalid number');
      done();
    })
    
    test('default to a numerical input of 1', function(done){
      let input = 'L';
      assert.equal(convertHandler.getNum(input),1);
      done();
    })
    
    test('read each valid input unit', function(done){
      let input = 'L';
      assert.equal(convertHandler.getUnit(input),'L');
      done();
    })
    
    test('error for an invalid input unit', function(done){
      let input = 'abcL';
      assert.equal(convertHandler.getUnit(input),'invalid unit');
      done();
    })
    
    test('the correct return unit for each valid input unit', function(done){
      let input = 'L';
      assert.equal(convertHandler.getReturnUnit(input),'gal');
      done();
    })
    
    test(' spelled-out string unit', function(done){
      let input = 'L';
      assert.equal(convertHandler.spellOutUnit(input),'liters');
      done();
    })
    
    test('gal to L', function(done){
      let input = 'gal';
      assert.equal(convertHandler.getReturnUnit(input),'L');
      done();
    })
    
    test('L to gal', function(done){
      let input = 'L';
      assert.equal(convertHandler.getReturnUnit(input),'gal');
      done();
    })
    
    test('mi to km', function(done){
      let input = 'mi';
      assert.equal(convertHandler.getReturnUnit(input),'km');
      done();
    })
    
    test('km to mi', function(done){
      let input = 'km';
      assert.equal(convertHandler.getReturnUnit(input),'mi');
      done();
    })
    
    test('lbs to kg', function(done){
      let input = 'lbs';
      assert.equal(convertHandler.getReturnUnit(input),'kg');
      done();
    })
    
    test('kg to lbs', function(done){
      let input = 'kg';
      assert.equal(convertHandler.getReturnUnit(input),'lbs');
      done();
    })
    
});
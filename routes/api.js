'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');


module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get((req,res)=>{
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);
    const returnNum = convertHandler.convert(initNum,initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum,initUnit,returnNum,returnUnit)
    const msg = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    }
    console.log(req.query.input + '->' + msg.string);
    if(!(/invalid/).test(msg.string)){
      res.send(msg);
    }else{
      //res.setHeader('content-type', 'text/html');
      res.json(msg.string)}
  })
};

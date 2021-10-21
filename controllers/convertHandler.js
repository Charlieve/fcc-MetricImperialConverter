function ConvertHandler() {
  
  this.getNum = function(input) {
    let result =[];
    result = input.replace(/[a-zA-Z]+$/i,'');
    result = result.split('/');
    if(!result[0]){result[0]='1'}
    if(!result.every(num=>(/^\d+\.*\d*|\/$/).test(num))){
      return 'invalid number'
    }
    switch (result.length){
      case 1: return Number(result[0])||'invalid number';
      case 2: return (Number(result[0]) / Number(result[1])) ||'invalid number';
      default: return 'invalid number';
    };
  };
  
  this.getUnit = function(input) {
    let result=[];
    input = input.toLowerCase();
    input = (input.match(/[a-z]+$/)||[''])[0]
    result = input.match(/gal|lbs|pounds|kg|mi|km|l/i)||[];
    return input.replace(/[.\d\/\s]+/,'')==result[0]
      ?result[0]==='l'?'L':result[0]
      :'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    initUnit= initUnit.toLowerCase();
    switch (initUnit){
      case 'gal': return 'L';
      case 'l':
      case 'L': return 'gal';
      case 'pounds':
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      case 'mi': return 'km';
      case 'km': return 'mi';
      default: return 'null'
    }
  };

  this.spellOutUnit = function(unit) {
    unit= unit.toLowerCase();
    switch (unit){
      case 'gal': return 'gallons';
      case 'l':
      case 'L': return 'liters';
      case 'pounds':
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
      default: return 'null'
    }
  };
  
  this.convert = function(initNum, initUnit) {
    function round(num){
      return Math.round((num + Number.EPSILON) * 100000) / 100000;
    }
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    initUnit= initUnit.toLowerCase();
    let result;
    switch (initUnit){
      case 'gal': return round(initNum * galToL);
      case 'l':
      case 'L': return round(initNum / galToL);
      case 'pounds':
      case 'lbs': return round(initNum * lbsToKg);
      case 'kg': return round(initNum / lbsToKg);
      case 'mi': return round(initNum * miToKm);
      case 'km': return round(initNum / miToKm);
      default: return 'null'
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = '';
    if(initNum === 'invalid number'){result = initNum};
    if(initUnit === 'invalid unit'){result==initNum?result=result + ' and unit':result=initUnit};
    if(!result){
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }
    return result;
  };
  
}

module.exports = ConvertHandler;

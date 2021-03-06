const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  test('Convert a valid input such as 10L', function(done){
    chai.request(server)
        .get('/api/convert')
        .query({input:'10L'})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.body.returnNum, 2.64172);
          assert.equal(res.body.returnUnit, 'gal');
          done()
        })
  })
  
  test('Convert an invalid input such as 32g', function(done){
    chai.request(server)
        .get('/api/convert')
        .query({input:'32g'})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.body, 'invalid unit');
          done()
        })
  })
  
  test('invalid number such as 3/7.2/4kg', function(done){
    chai.request(server)
        .get('/api/convert')
        .query({input:'3/7.2/4kg'})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.body, 'invalid number');
          done()
        })
  })
  
  test(' invalid number AND unit such as 3/7.2/4kilomegagram', function(done){
    chai.request(server)
        .get('/api/convert')
        .query({input:'3/7.2/4kilomegagram'})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.body, 'invalid number and unit');
          done()
        })
  })
  
  test('no number such as kg', function(done){
    chai.request(server)
        .get('/api/convert')
        .query({input:'kg'})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.body.returnNum, 2.20462);
          assert.equal(res.body.returnUnit, 'lbs');
          done()
        })
  })
});

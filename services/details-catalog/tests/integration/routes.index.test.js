process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');

const should = chai.should();

const server = require('../../src/app');

chai.use(chaiHttp);

describe('GET /does/not/exist', () => {
  it('should throw an error', (done) => {
    chai.request(server)
      .get('/does/not/exist')
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        done();
      });
  });
});

describe('POST /details', () => {
  it('should throw an error', (done) => {
    chai.request(server)
      .post('/details')
      .field('fileField', fs.readFileSync('test.xls'))
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(401);
        res.type.should.equal('application/json');
        done();
      });
  });
});

describe('GET /details/search?q=param', () => {
  it('should get all data which contains param', (done) => {
    chai.request(server)
      .get('/details/search?q=pzram')
      .end((err, res) => {
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        done();
      });
  });
});

describe('GET /details', () => {
  it('should get details list', (done) => {
    chai.request(server)
      .get('/details')
      .end((err, res) => {
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        done();
      });
  });
});

describe('GET /details/:id', () => {
  it('should get detail information about auto detail', (done) => {
    chai.request(server)
      .get('/details/id')
      .end((err, res) => {
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        done();
      });
  });
});

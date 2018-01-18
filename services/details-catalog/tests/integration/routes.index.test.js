const chai = require('chai');
const chaiHttp = require('chai-http');
const pg = require('../../utils/pg');

const should = chai.should();

const server = require('../../src/app');

chai.use(chaiHttp);

describe('Details Api routes', () => {
  beforeEach(async () => {
    await pg('details').test();
  });
  afterEach(async () => {
    await pg('details').drop();
  });

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
    it('should throw a file not selected error', (done) => {
      chai.request(server)
        .post('/details')
        .set('authorization', 'Bearer test')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          done();
        });
    });
    it('should throw an unauthorized error', (done) => {
      chai.request(server)
        .post('/details')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(401);
          res.type.should.equal('application/json');
          done();
        });
    });
    it('should post data from file', () => {
      chai.request(server)
        .post('/details')
        .set('authorization', 'Bearer test')
        .attach('myFile', 'test.xls', 'test.xls')
        .end((err, res) => {
          res.type.should.equal('application/json');
          res.should.have.status(201);
          res.body.msg.should.equal('File uploaded');
        });
    });
  });
});
/*
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
*/

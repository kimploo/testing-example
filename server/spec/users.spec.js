const chai = require('chai');
const chaiHttp = require('chai-http');

const { factory } = require('@bluesh55/factory');
const userFixture = require('./fixtures/users.json');

const { User } = require('../../database/models');

const { expect } = chai;

chai.use(chaiHttp);

const server = require('../index');

describe('/users', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  it('GET /users request should response correctly', async done => {
    await factory.create('user', userFixture[0]);

    chai
      .request(server)
      .get('/users')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.equal(userFixture[0]);
        expect(res.body).to.have.lengthOf(1);
        done();
      });
  });

  it('GET /users/:id request should response correctly', async done => {
    await factory.create('user', userFixture[0]);

    chai
      .request(server)
      .get('/users')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.equal(userFixture[0]);
        expect(res.body).to.have.lengthOf(1);
        done();
      });
  });

  it('POST /users request should response correctly', async done => {
    chai
      .request(server)
      .post('/users')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(201);

        done();
      });
  });

  it('PUT /users request should response correctly', async done => {
    chai
      .request(server)
      .put('/users')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(201);

        done();
      });
  });

  it('PUT /users/:id request should response correctly', async done => {
    chai
      .request(server)
      .put('/users')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(201);

        done();
      });
  });

  it('DELETE /users request should response correctly', async done => {
    chai
      .request(server)
      .delete('/users')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(201);

        done();
      });
  });

  it('DELETE /users/:id request should response correctly', async done => {
    chai
      .request(server)
      .delete('/users')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(201);

        done();
      });
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');

const { factory } = require('@bluesh55/factory');
const userFixture = require('./fixtures/users.json');

const { User } = require('../../database/models');

const { expect } = chai;

chai.use(chaiHttp);

const server = require('../index');

describe('/users', () => {
  // teardown
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });
  describe('/GET ', () => {
    it('it should GET all the users', async done => {
      await factory.create('user', userFixture[0]);
      await factory.create('user', userFixture[1]);

      chai
        .request(server)
        .get('/users')
        .end((err, res) => {
          expect(err).to.be.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body[0]).to.equal(userFixture[0]);
          expect(res.body[1]).to.equal(userFixture[1]);
          expect(res.body).to.have.length(2);
          done();
        });
    });
  });

  describe('/GET/:id ', () => {
    it('it should GET a user by specific id', async done => {
      await factory.create('user', userFixture[0]);

      chai
        .request(server)
        .get(`/users/${userFixture[0].id}`)
        .send()
        .end((err, res) => {
          expect(err).to.be.equal(null);

          expect(res).to.have.status(200);

          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('avatar');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('job');

          expect(res.body).to.equal(userFixture[0]);

          done();
        });
    });
  });

  describe('/POST ', () => {
    it('it should not POST a user without email field', done => {
      const userWithoutEmail = {
        id: 1,
        name: 'Duhyun Kim',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/jayphen/128.jpg',
        job: 'software engineer'
      };

      chai
        .request(server)
        .post('/user')
        .send(userWithoutEmail)
        .end((err, res) => {
          expect(err).to.be.equal(null);

          expect(res).to.have.status(200);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.property('email');
          expect(res.body.errors.email)
            .to.have.property('kind')
            .eql('required');

          done();
        });
    });
    it('it should POST a user', done => {
      chai
        .request(server)
        .post('/user')
        .send(userFixture[0])
        .end((err, res) => {
          expect(err).to.be.equal(null);

          expect(res).to.have.status(201);
          expect(res.body)
            .to.have.property('message')
            .eql('user successfully created');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('avatar');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('job');

          done();
        });
    });
  });

  describe('/PUT/:id ', () => {
    it('it should UPDATE a user by specific id', async done => {
      await factory.create('user', userFixture[0]);

      const modifiedUser = {
        id: 1,
        name: '김두현',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/jayphen/128.jpg',
        email: 'duhyun.kim@codestates.com',
        job: 'software engineer'
      };

      chai
        .request(server)
        .put(`user/${userFixture[0].id}`)
        .send(modifiedUser)
        .end((err, res) => {
          expect(err).to.be.equal(null);

          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body)
            .to.have.property('message')
            .eql('user updated.');
          expect(res.body)
            .to.have.property('name')
            .eql('김두현');
        });

      done();
    });
  });

  describe('/DELETE/:id', () => {
    it('it should DELETE a user by specific id', async done => {
      await factory.create('user', userFixture[0]);

      chai
        .request(server)
        .delete(`user/${userFixture[0].id}`)
        .send(userFixture[0])
        .end((err, res) => {
          expect(err).to.be.equal(null);

          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body)
            .to.have.property('message')
            .eql('user successfully deleted.');
          expect(res.body)
            .to.have.property('name')
            .eql('김두현');
          expect(res.body.result)
            .to.have.property('ok')
            .eql(1);
          expect(res.body.result)
            .to.have.property('n')
            .eql(1);

          done();
        });
    });
  });
});

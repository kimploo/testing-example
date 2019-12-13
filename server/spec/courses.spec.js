const chai = require('chai');
const chaiHttp = require('chai-http');

const { factory } = require('@bluesh55/factory');
const courseFixture = require('./fixtures/courses.json');

const { expect } = chai;

chai.use(chaiHttp);

const server = require('../index');

describe.skip('/courses', () => {
  it('GET /users request should response ', done => {
    done();
  });
});

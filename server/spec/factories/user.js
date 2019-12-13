const { User } = require('../../../database/models');

module.exports = {
  name: 'user',
  specification: {
    id: {
      type: Number
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    email: {
      type: String
    },
    job: {
      type: String
    }
  },
  creator: attributes => {
    return User.create(attributes);
  }
};

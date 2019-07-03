const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users', [
    {
      name: 'Steve Jobs',
      username: 'steve',
      password: bcrypt.hashSync('steve', 10),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};

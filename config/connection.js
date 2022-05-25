const { connect, connection } = require('mongoose');

connect('mongodb://localhost/thesearesomewords', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
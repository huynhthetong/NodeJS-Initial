const morgan = require('morgan');
const bodyParser = require('body-parser');

// set up global middleware is here
module.exports = app => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

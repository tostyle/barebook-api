'use strict';
const schema = require('../helpers/schema')

module.exports = function (Categories) {
  schema(Categories, 'categories');
};

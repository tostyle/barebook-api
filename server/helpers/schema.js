module.exports = function schema(Model, modelName) {
  Model.schema = (cb) => {
    const response = require(`../models/${modelName}.json`);
    cb(null, response);
  };
  Model.remoteMethod(
    'schema', {
      http: {
        path: '/schema',
        verb: 'get',
      },
      returns: {
        arg: 'schema',
        type: 'object',
      },
    }
  );
}
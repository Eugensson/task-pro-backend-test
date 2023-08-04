const jwt = require('jsonwebtoken');

const jwtGenerator = payload => {
  const { HASH_SECRET_KEY } = process.env;
  const result = jwt.sign(payload, HASH_SECRET_KEY, { expiresIn: '23h' });
  return result;
};

module.exports = jwtGenerator;

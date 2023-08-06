const jwt = require('jsonwebtoken');

const jwtGenerator = payload => {
  const { HASH_SECRET_KEY } = process.env;
  return jwt.sign(payload, HASH_SECRET_KEY, { expiresIn: '23h' });
};

module.exports = jwtGenerator;

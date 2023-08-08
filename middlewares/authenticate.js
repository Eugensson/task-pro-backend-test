const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { HttpError } = require('../helpers');

const { HASH_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, HASH_SECRET_KEY);
    console.log(id);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;

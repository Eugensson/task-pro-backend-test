const bcrypt = require('bcrypt');

const { User } = require('../../models/user');

const { HttpError, ctrlWrapper, jwtGenerator } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const JWT = jwtGenerator({ email: email });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    token: JWT,
  });

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
      token: JWT,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };

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

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const JWT = jwtGenerator({ id: newUser._id });

  const newToken = await User.findByIdAndUpdate(
    newUser._id,
    {
      token: JWT,
    },
    { new: true }
  );
  console.log(JWT === newToken.token);
  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
      token: newToken.token,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };

const bcrypt = require('bcrypt');

const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, jwtGenerator } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const token = jwtGenerator({
    email: user.email,
  });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user,
  });
};

module.exports = { login: ctrlWrapper(login) };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { HttpError, ctrlWrapper } = require('../../helpers');

const { HASH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'Not found');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(403, 'Provided password is incorrect');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, HASH_SECRET_KEY, { expiresIn: '23h' });
  user.token = token;
  await user.save();

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

module.exports = { login: ctrlWrapper(login) };

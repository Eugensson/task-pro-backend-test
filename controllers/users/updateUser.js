const bcrypt = require('bcrypt');
const { HttpError, ctrlWrapper } = require('../../helpers');
const { User } = require('../../models');

const updateUser = async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    throw HttpError(403);
  }

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(400);
  }

  const fieldToUpdate = Object.keys(user._doc).map(item => {
    if (Object.keys(req.body).includes(item)) {
      return item;
    }
    return item;
  });

  const updatedUser = user;

  for (const field of fieldToUpdate) {
    if (field !== undefined) updatedUser[field] = req.body[field];
    if (field === 'password') {
      if (req.body[field]) {
        const hashedPassword = bcrypt.hashSync(req.body[field], 10);
        updatedUser[field] = hashedPassword;
      }
    }
  }

  const validTheme = ['LIGHT', 'DARK', 'VIOLET'].includes(req.body.theme);

  if (!validTheme) {
    throw HttpError(400, 'Subscription with data plan does not exist');
  }

  await User.findByIdAndUpdate(_id, { theme: req.body.theme });

  delete updatedUser._doc._id;
  delete updatedUser._doc.__v;

  const newUser = await User.findByIdAndUpdate(
    _id,
    { ...updatedUser },
    { new: true }
  );

  res.status(200).json(newUser);
};

module.exports = {
  updateUser: ctrlWrapper(updateUser),
};

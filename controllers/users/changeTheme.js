const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const changeTheme = async (req, res) => {
  const { _id } = req.user;

  const validTheme = ['light', 'dark', 'violet'].includes(req.body.theme);

  if (!validTheme) {
    throw HttpError(400, 'Theme does not exist');
  }

  await User.findByIdAndUpdate(_id, { theme: req.body.theme });

  res.status(200).json({
    message: 'Theme was changed',
  });
};

module.exports = {
  changeTheme: ctrlWrapper(changeTheme),
};

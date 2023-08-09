const { User } = require('../../models/user');

const { HTTPError } = require('../../helpers');

const updateTheme = async (req, res) => {
  const { _id } = req.user;

  const validTheme = ['LIGHT', 'DARK', 'VIOLET'].includes(req.body.theme);

  if (!validTheme) {
    throw HTTPError(400, 'Subscription with data plan does not exist');
  }

  await User.findByIdAndUpdate(_id, { theme: req.body.theme });

  res.status(200).json({
    message: 'Theme was changed',
  });
};

module.exports = { updateTheme };

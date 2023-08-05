const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const changeTheme = async (req, res) => {
  const { _id } = req.user;

  const { theme } = req.body;
  console.log(theme);

  const user = await User.findByIdAndUpdate(
    _id,
    { theme: req.body.theme },
    { new: true }
  );

  if (!user) {
    throw HttpError(400);
  }
  
  res.status(200).json({
    theme: user.theme,
  });
};

module.exports = {
  changeTheme: ctrlWrapper(changeTheme),
};

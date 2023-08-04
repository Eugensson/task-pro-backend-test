const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, {
    name,
    email,
    password,
  });

  res.status(200).json({
    message: 'User info was changed',
  });
};

module.exports = {
  updateUser: ctrlWrapper(updateUser),
};

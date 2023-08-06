const { ctrlWrapper } = require('../../helpers');
const { User } = require('../../models');

const getCurrent = async (req, res) => {
  const user = req.user;

  const result = await User.findById(user);

  res.status(200).json({
    result,
  });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };

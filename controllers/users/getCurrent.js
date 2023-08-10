const { ctrlWrapper } = require('../../helpers');

const getCurrent = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };

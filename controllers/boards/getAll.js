const { Board } = require('../../models');
const { ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const query = { owner };

  const result = await Board.find(query).populate(
    'owner',
    'title icon background columns'
  );
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};

const { Board } = require('../../models');
const { User } = require('../../models');
const { ctrlWrapper } = require('../../helpers');

const add = async (req, res) => {
  const { _id: owner, boards } = req.user;

  const result = await Board.create({ ...req.body, owner });

  const updatedBoards = [...boards, result._id];

  await User.updateOne({ _id: owner }, { boards: updatedBoards });

  res.status(201).json(result);
};

module.exports = {
  add: ctrlWrapper(add),
};

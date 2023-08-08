const { User, Board } = require('../../models');
const { ctrlWrapper } = require('../../helpers');

const add = async (req, res) => {
  const { _id: owner, boards } = req.user;
  const { boardsData, id } = req.body;

  const boardDataWithOwner = { ...req.body, owner };

  const result = await Board.create(boardDataWithOwner);

  const updatedBoards = [...boards, result._id];
  await User.updateOne({ _id: owner }, { boards: updatedBoards });

  const modifiedResult = { ...result._doc, boardsData, id };
  res.status(201).json(modifiedResult);
};

module.exports = {
  add: ctrlWrapper(add),
};

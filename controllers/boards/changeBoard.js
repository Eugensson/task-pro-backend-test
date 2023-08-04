const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');

const changeBoard = async (req, res) => {
  try {
    const { boardsData } = req.body;
    const user = req.user;

    const existingBoardIndex = User.boards.findIndex(
      board => board.id === boardsData.id
    );

    if (existingBoardIndex !== -1) {
      User.boards[existingBoardIndex] = boardsData;
    } else {
      User.boards.push(boardsData);
    }

    await user.save();

    return res.json({
      message: 'Board updated successfully',
      boards: user.boards,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { changeBoard: ctrlWrapper(changeBoard) };

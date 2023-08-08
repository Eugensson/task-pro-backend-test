const { Board } = require('../../models');
const { User } = require('../../models');
const { HttpError, ctrlWrapper } = require('../../helpers');

const deleteById = async (req, res) => {
  const { boardId } = req.params;

  const result = await Board.findByIdAndDelete(boardId);

  if (!result) {
    throw new HttpError(404, 'Not found');
  }

  const userId = req.user._id;

  const updatedBoards = req.user.boards.filter(
    board => board.toString() !== boardId
  );

  await User.updateOne({ _id: userId }, { boards: updatedBoards });

  res.status(200).json({ message: 'Board deleted' });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};

// if (Array.isArray(columns) && columns.length === 0) {
//   //   res.status(200).json({ message: 'Board deleted' });
//   // } else {
//   //   res
//   //     .status(400)
//   //     .json({ message: 'Cannot delete board with columns present' });
//   // }

const { User, Board } = require('../../models');
const { HttpError, ctrlWrapper } = require('../../helpers');

const deleteById = async (req, res) => {
  const { boardId } = req.params;

  const board = await Board.findById(boardId);

  if (!board) {
    throw new HttpError(404, 'Not found');
  }

  if (board.columnOrder.length === 0) {
    const result = await Board.findByIdAndDelete(boardId);

    if (!result) {
      throw new HttpError(404, 'Not found');
    }

    const userId = req.user._id;

    const updatedBoards = req.user.boards.filter(
      userBoardId => userBoardId.toString() !== boardId
    );

    await User.updateOne({ _id: userId }, { boards: updatedBoards });

    res.status(200).json({ message: 'Board deleted' });
  } else {
    res.status(400).json({ message: 'Cannot delete board with columns' });
  }
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};

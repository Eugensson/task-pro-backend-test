const { Board } = require('../../models');
const { HttpError, ctrlWrapper } = require('../../helpers');

const updateById = async (req, res) => {
  const { boardId } = req.params;

  const updatedBoard = await Board.findByIdAndUpdate(boardId, req.body, {
    new: true,
  });

  if (!updatedBoard) {
    throw HttpError(404, 'Not found');
  }

  res.json(updatedBoard);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
};

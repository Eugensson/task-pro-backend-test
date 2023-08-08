const { Board } = require('../../models');
const { HttpError, ctrlWrapper } = require('../../helpers');

const updateById = async (req, res) => {
  const { boardId } = req.params;
  const { boardsData, id } = req.body;

  const updatedBoard = await Board.findByIdAndUpdate(boardId, req.body, {
    new: true,
  });

  if (!updatedBoard) {
    throw HttpError(404, 'Not found');
  }

  const modifiedResult = { ...updatedBoard._doc, boardsData, id };
  res.json(modifiedResult);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
};

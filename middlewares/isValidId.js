const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { boardId } = req.params;

  if (!isValidObjectId(boardId)) {
    next(HttpError(400, `${boardId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;

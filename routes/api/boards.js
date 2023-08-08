const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/boards');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { addBoardSchema, updateBoardSchema } = require('../../schemas');

router.get('/', authenticate, ctrl.getAll);

router.post('/', authenticate, validateBody(addBoardSchema), ctrl.add);

router.patch(
  '/:boardId',
  isValidId,
  authenticate,
  validateBody(updateBoardSchema),
  ctrl.updateById
);

router.delete('/:boardId', authenticate, isValidId, ctrl.deleteById);

module.exports = router;

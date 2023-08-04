const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/boards');

const router = express.Router();

router.patch(
  '/changeBoard',
  authenticate,
  validateBody(schemas.boardSchema),
  ctrl.changeBoard
);

module.exports = router;

const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { boardSchema } = require('../../models/user');

const ctrl = require('../../controllers/boards');

const router = express.Router();

router.patch(
  '/changeBoard',
  authenticate,
  validateBody(boardSchema),
  ctrl.changeBoard
);

module.exports = router;

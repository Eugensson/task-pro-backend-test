const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { helperSchema } = require('../../models/helper');

const ctrl = require('../../controllers/hepler');

const router = express.Router();

router.post(
  '/',
  authenticate,
  validateBody(helperSchema),
  ctrl.sendHelpRequest
);

module.exports = router;

const express = require('express');
const router = express.Router();
const { validateBody, authenticate } = require('../../middlewares');
const { helperSchema } = require('../../schemas');
const ctrl = require('../../controllers/hepler');

router.post(
  '/',
  authenticate,
  validateBody(helperSchema),
  ctrl.sendHelpRequest
);

module.exports = router;

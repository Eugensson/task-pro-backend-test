const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { sendHelpRequestSchema } = require('../../models/validationSchemas');

const sendHelpRequest = require('../../utils/helper');

const router = express.Router();

router.post(
  '/',
  authenticate,
  validateBody(sendHelpRequestSchema),
  sendHelpRequest
);

module.exports = router;

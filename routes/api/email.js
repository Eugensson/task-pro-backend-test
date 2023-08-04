const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { sendHelpRequestSchema } = require('../../models/validationSchemas');

const sendHelpRequest = require('../../utils/email/send_help_request');

const router = express.Router();

router.post(
  '/helper',
  authenticate,
  validateBody(sendHelpRequestSchema),
  sendHelpRequest
);

module.exports = router;

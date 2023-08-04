const express = require('express');

const sendHelpRequest = require('../../utils/email/send_help_request');

const router = express.Router();

router.post('/helper', sendHelpRequest);

module.exports = router;

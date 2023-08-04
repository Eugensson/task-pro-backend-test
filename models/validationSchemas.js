const Joi = require("joi");

const sendHelpRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  comment: Joi.string().min(20).required(),
});

module.exports = {
  sendHelpRequestSchema,
};
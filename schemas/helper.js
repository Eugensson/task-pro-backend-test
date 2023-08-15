const Joi = require('joi');

const helperSchema = Joi.object({
  email: Joi.string().email().required(),
  comment: Joi.string().required(),
});

module.exports = {
  helperSchema,
};

const Joi = require('joi');

const helperSchema = Joi.object({
  email: Joi.string().email().required(),
  comment: Joi.string().min(20).required(),
});

module.exports = {
  helperSchema,
};

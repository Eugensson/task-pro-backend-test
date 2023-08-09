const joi = require('joi');

const registerSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

const loginSchema = joi.object({
  password: joi.string().required(),
  email: joi.string().required(),
});

const updateUserSchema = joi.object({
  username: joi.string().min(2).max(32),
  password: joi.string(),
  email: joi.string(),
  avatarURL: joi.string(),
  theme: joi.string().valid('DARK', 'LIGHT', 'VIOLET'),
});

module.exports = { registerSchema, loginSchema, updateUserSchema };

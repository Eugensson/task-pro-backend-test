const joi = require('joi');

const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/;

const registerSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().pattern(passRegex).min(8).max(64).required(),
});

const loginSchema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().pattern(passRegex).min(8).max(64).required(),
});

const updateUserSchema = joi.object({
  username: joi.string().min(2).max(32),
  email: joi.string().pattern(emailRegexp),
  password: joi.string().pattern(passRegex).min(8).max(64),
  avatarURL: joi.string(),
  theme: joi.string().valid('DARK', 'LIGHT', 'VIOLET'),
});

module.exports = { registerSchema, loginSchema, updateUserSchema };

const { Schema, model } = require('mongoose');
const joi = require('joi');

const { handleMongooseError } = require('../helpers');
const emailRegexp =
  /^(?=.*[@.])[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/;
// const passRegexp =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      // match: passRegexp,
      required: [true, 'Set password for user'],
    },
    avatarURL: { type: String, default: '' },
    theme: {
      type: String,
      enum: ['LIGHT', 'DARK', 'VIOLET'],
      default: 'LIGHT',
    },
    boards: { type: Array, default: [] },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.post('save', handleMongooseError);

const registerSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required(),
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
  theme: joi.string().valid('DARK', 'LIGHT', 'VIOLET').default('LIGHT'),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateUserSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};

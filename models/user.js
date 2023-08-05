const { Schema, model } = require('mongoose');
const joi = require('joi');

const { handleMongooseError } = require('../helpers');
// const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// const passRegexp =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/;

const emailRegexp =
  /^(?=.*[@.])[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/;
// const passRegexp =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/;

// const iconList = [
//   'project',
//   'star',
//   'loading',
//   'puzzle-piece',
//   'container',
//   'lightning',
//   'colors',
//   'hexagon',
// ];
// const backgroundList = ['moon'];

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

const userSchemaJoi = joi.object({
  username: joi.string().min(2).max(32),
  password: joi.string().required(),
  email: joi.string().required(),
  avatarURL: joi.string(),
  token: joi.string().token().default(''),
  theme: joi.string().valid('DARK', 'LIGHT', 'VIOLET').default('LIGHT'),
});

const updateThemeSchema = joi.object({
  theme: joi.string().valid('DARK', 'LIGHT', 'VIOLET').required(),
});

const updateUserSchema = joi.object({
  username: joi.string().min(2).max(32),
  password: joi.string(),
  email: joi.string(),
  avatarURL: joi.string(),
});

// const board = {
//   id: '',
//   title: '',
//   icon: '',
//   background: '',
//   boardsData: {
//     columns: {
//       awe: {
//         id: '',
//         title: '',
//         taskIds: ['qwe'],
//       },
//     },
//     tasks: {
//       qwe: {
//         id: '',
//         title: '',
//         description: '',
//         priority: '',
//         deadline: '',
//       },
//     },
//     columnOrder: ['awe'],
//   },
// };

const boardSchema = joi.object({
  id: joi.string().required(),
  title: joi.string().required(),
  icon: joi.string().required(),
  background: joi.string().required(),
  boardsData: joi
    .object()
    .keys({
      tasks: joi
        .object()
        .pattern(
          joi.string(),
          joi.object({
            id: joi.string().required(),
            title: joi.string().required(),
            description: joi.string().required(),
            priority: joi.string(),
            deadline: joi.string(),
          })
        )
        .default({}),
      columns: joi
        .object()
        .pattern(
          joi.string(),
          joi.object({
            id: joi.string().required(),
            title: joi.string().required(),
            taskIds: joi.array().items(joi.string()),
          })
        )
        .default({}),
      columnOrder: joi.array().items(joi.string()).required().default([]),
    })
    .required(),
});

// const schemas = {
//   registerSchema,
//   loginSchema,
//   boardSchema,
//   updateThemeSchema,
//   updateUserSchema,
// };

const User = model('user', userSchema);

module.exports = {
  User,
  userSchemaJoi,
  boardSchema,
  updateThemeSchema,
  updateUserSchema,
};

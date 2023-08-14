const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,

      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,

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

const User = model('user', userSchema);

module.exports = { User };

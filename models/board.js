const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const joi = require('joi');

const { handleMongooseError } = require('../helpers');

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for board'],
    },
    icon: {
      type: String,
      enum: [
        'project',
        'star',
        'loading',
        'puzzle-piece',
        'container',
        'lightning',
        'colors',
        'hexagon',
      ],
      default: 'project',
    },
    background: {
      type: String,
      enum: ['', 'moon'],
      default: '',
    },
    columns: {
      type: Array,
      default: [],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: false }
);

boardSchema.post('save', handleMongooseError);

const Board = model('board', boardSchema);

const addBoardSchema = joi.object({
  title: joi.string().required(),
  icon: joi.string(),
  background: joi.string(),
});

const updateBoardSchema = joi.object({
  title: joi.string(),
  icon: joi.string(),
  background: joi.string(),
});

const schemas = { addBoardSchema, updateBoardSchema };

module.exports = { Board, schemas };

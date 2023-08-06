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
        'icon-project',
        'icon-star',
        'icon-loading',
        'icon-puzzle-piece',
        'icon-container',
        'icon-lightning',
        'icon-colors',
        'icon-hexagon',
      ],
      default: 'icon-project',
    },
    background: {
      type: String,
      enum: [
        'bg1.jpg',
        'bg2.jpg',
        'bg3.jpg',
        'bg4.jpg',
        'bg5.jpg',
        'bg6.jpg',
        'bg7.jpg',
        'bg8.jpg',
        'bg9.jpg',
        'bg10.jpg',
        'bg11.jpg',
        'bg12.jpg',
        'bg13.jpg',
        'bg14.jpg',
        'bg15.jpg',
        'bg16.jpg',
      ],
      default: 'bg1.jpg',
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

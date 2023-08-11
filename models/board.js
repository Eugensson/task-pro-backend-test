const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const { handleMongooseError } = require('../helpers');

const boardSchema = new Schema(
  {
    id: { type: String, unique: true, required: [true, 'Set board Id'] },
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
        'bg1',
        'bg2',
        'bg3',
        'bg4',
        'bg5',
        'bg6',
        'bg7',
        'bg8',
        'bg9',
        'bg10',
        'bg11',
        'bg12',
        'bg13',
        'bg14',
        'bg15',
        'bg16',
      ],
      default: 'bg1',
    },
    boardsData: {
      tasks: {
        type: Object,
        // required: true,
        default: {},
      },
      columns: {
        type: Object,
        // required: true,
        default: {},
      },
      columnOrder: {
        type: Array,
        default: [],
      },
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

module.exports = { Board };

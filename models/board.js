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

// const boardSchema = joi.object({
//   id: joi.string().required(),
//   title: joi.string().required(),
//   icon: joi.string().required(),
//   background: joi.string().required(),
//   boardsData: joi
//     .object()
//     .keys({
//       tasks: joi
//         .object()
//         .pattern(
//           joi.string(),
//           joi.object({
//             id: joi.string().required(),
//             title: joi.string().required(),
//             description: joi.string().required(),
//             priority: joi.string(),
//             deadline: joi.string(),
//           })
//         )
//         .default({}),
//       columns: joi
//         .object()
//         .pattern(
//           joi.string(),
//           joi.object({
//             id: joi.string().required(),
//             title: joi.string().required(),
//             taskIds: joi.array().items(joi.string()),
//           })
//         )
//         .default({}),
//       columnOrder: joi.array().items(joi.string()).required().default([]),
//     })
//     .required(),
// });

boardSchema.post('save', handleMongooseError);

const Board = model('board', boardSchema);

const addBoardSchema = joi.object({
  title: joi.string().required(),
  icon: joi
    .string()
    .valid(
      'icon-project',
      'icon-star',
      'icon-loading',
      'icon-puzzle-piece',
      'icon-container',
      'icon-lightning',
      'icon-colors',
      'icon-hexagon'
    )
    .default('icon-project'),
  background: joi
    .string()
    .valid(
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
      'bg16.jpg'
    )
    .default('bg1.jpg'),
});

const updateBoardSchema = joi.object({
  title: joi.string(),
  icon: joi
    .string()
    .valid(
      'icon-project',
      'icon-star',
      'icon-loading',
      'icon-puzzle-piece',
      'icon-container',
      'icon-lightning',
      'icon-colors',
      'icon-hexagon'
    )
    .default('icon-project'),
  background: joi
    .string()
    .valid(
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
      'bg16.jpg'
    )
    .default('bg1.jpg'),
});

const schemas = { addBoardSchema, updateBoardSchema };

module.exports = { Board, schemas };

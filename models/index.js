const { User } = require('./user');
const { Board } = require('./board');

module.exports = {
  User,
  Board,
};

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

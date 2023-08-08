const joi = require('joi');

const addBoardSchema = joi.object({
  id: joi.string().required(),
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
      'bg16'
    ),
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

const updateBoardSchema = joi.object({
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

module.exports = { addBoardSchema, updateBoardSchema };

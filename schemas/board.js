const joi = require('joi');

const addBoardSchema = joi.object({
  // id: joi.string().required(),
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

const updateBoardSchema = joi.object({
  // id: joi.string().required(),
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

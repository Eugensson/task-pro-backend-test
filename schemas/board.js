const joi = require('joi');

const addBoardSchema = joi.object({
  id: joi.string().required(),
  title: joi.string(),
  icon: joi.string(),
  background: joi.string(),
  boardsData: joi.object().keys({
    tasks: joi
      .object()
      .pattern(
        joi.string(),
        joi.object({
          id: joi.string(),
          title: joi.string(),
          description: joi.string(),
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
          id: joi.string(),
          title: joi.string(),
          taskIds: joi.array().items(joi.string()),
        })
      )
      .default({}),
    columnOrder: joi.array().items(joi.string()).default([]),
  }),
});

const updateBoardSchema = joi.object({
  id: joi.string().required(),
  title: joi.string(),
  icon: joi.string(),
  background: joi.string(),
  boardsData: joi.object().keys({
    tasks: joi
      .object()
      .pattern(
        joi.string(),
        joi.object({
          id: joi.string(),
          title: joi.string(),
          description: joi.string(),
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
          id: joi.string(),
          title: joi.string(),
          taskIds: joi.array().items(joi.string()),
        })
      )
      .default({}),
    columnOrder: joi.array().items(joi.string()).default([]),
  }),
});

module.exports = { addBoardSchema, updateBoardSchema };

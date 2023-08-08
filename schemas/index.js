const { registerSchema, loginSchema, updateUserSchema } = require('./user');
const { addBoardSchema, updateBoardSchema } = require('./board');
const { helperSchema } = require('./helper');

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  addBoardSchema,
  updateBoardSchema,
  helperSchema,
};

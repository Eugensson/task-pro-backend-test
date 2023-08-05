const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');

const {
  userSchemaJoi,
  updateUserSchema,
  updateThemeSchema,
} = require('../../models/user');

const {
  getCurrent,
  login,
  logout,
  register,
} = require('../../controllers/auth');

const {
  updateUser,
  changeTheme,
  updateAvatar,
} = require('../../controllers/users');

const router = express.Router();

router.post('/register', validateBody(userSchemaJoi), register);

router.post('/login', validateBody(userSchemaJoi), login);

router.post('/logout', authenticate, logout);

router.get('/current', authenticate, getCurrent);

router.patch(
  '/theme',
  authenticate,
  validateBody(updateThemeSchema),
  changeTheme
);

router.patch('/data', authenticate, validateBody(updateUserSchema), updateUser);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;

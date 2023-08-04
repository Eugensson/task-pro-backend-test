const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/users');

const router = express.Router();

router.patch(
  '/theme',
  authenticate,
  validateBody(schemas.updateThemeSchema),
  ctrl.changeTheme
);

router.patch(
  '/data',
  authenticate,
  validateBody(schemas.updateUserSchema),
  ctrl.updateUser
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = router;

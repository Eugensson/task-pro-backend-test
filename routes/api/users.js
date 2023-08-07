const express = require('express');
const router = express.Router();

const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/users');

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
  '/update',
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

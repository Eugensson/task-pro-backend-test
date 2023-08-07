const { register } = require('./register');
const { login } = require('./login');
const { logout } = require('./logout');
const { getCurrent } = require('./getCurrent');
const { updateUser } = require('./updateUser');
const { updateAvatar } = require('./updateAvatar');

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateUser,
  updateAvatar,
};

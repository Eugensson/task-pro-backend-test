const path = require('path');
const Jimp = require('jimp');
const fs = require('fs/promises');
// const { cloudinary } = require('../../utils/cloudinary');
const { ctrlWrapper } = require('../../helpers');
// const { HttpError, ctrlWrapper } = require('../../helpers');

const { User } = require('../../models/user');
const avatarsDir = path.join(__dirname, '../', '../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatarName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, avatarName);

  Jimp.read(tempUpload, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(tempUpload, () => {
      fs.rename(tempUpload, resultUpload);
      const avatarURL = path.join('avatars', avatarName);

      User.findByIdAndUpdate(_id, { avatarURL }).then(() => {
        res.json({ avatarURL });
      });
    });
  });
};

// const updateAvatar = async (req, res) => {
//   cloudinary.uploader.upload(req.file.path, function (err, result) {
//     if (err) {
//       next(HttpError(500, 'Error'));
//       console.log(err.message);
//     }
//     res.status(200).json({
//       data: result.url,
//     });
//   });
//   await User.findByIdAndUpdate(_id, { avatarURL: result.url.data });
// };

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };

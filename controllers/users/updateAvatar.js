const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { ctrlWrapper } = require('../../helpers');
const { User } = require('../../models/user');

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const result = await cloudinary.uploader.upload(req.file.path);

  const avatarURL = result.secure_url;

  User.findByIdAndUpdate(_id, { avatarURL: avatarURL }).then(() => {
    fs.unlinkSync(req.file.path);

    res.json({ avatarURL });
  });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };

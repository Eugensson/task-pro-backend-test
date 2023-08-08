const joi = require('joi');

const addBoardSchema = joi.object({
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
      'bg1.jpg',
      'bg2.jpg',
      'bg3.jpg',
      'bg4.jpg',
      'bg5.jpg',
      'bg6.jpg',
      'bg7.jpg',
      'bg8.jpg',
      'bg9.jpg',
      'bg10.jpg',
      'bg11.jpg',
      'bg12.jpg',
      'bg13.jpg',
      'bg14.jpg',
      'bg15.jpg',
      'bg16.jpg'
    )
    .default('bg1.jpg'),
});

const updateBoardSchema = joi.object({
  title: joi.string(),
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
      'bg1.jpg',
      'bg2.jpg',
      'bg3.jpg',
      'bg4.jpg',
      'bg5.jpg',
      'bg6.jpg',
      'bg7.jpg',
      'bg8.jpg',
      'bg9.jpg',
      'bg10.jpg',
      'bg11.jpg',
      'bg12.jpg',
      'bg13.jpg',
      'bg14.jpg',
      'bg15.jpg',
      'bg16.jpg'
    )
    .default('bg1.jpg'),
});

module.exports = { addBoardSchema, updateBoardSchema };

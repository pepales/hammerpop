const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const advertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    adtype: {
      type: String,
      enum: ['buy', 'sell'],
      required: true,
      index: true,
    },
    description: {
      type: String,
      max: 1000,
    },
    metatitle: {
      type: String,
    },
    metadesc: {
      type: String,
    },
    photo: {
      type: String,
    },
    tags: [{ type: ObjectId, ref: 'Tag', required: true }],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Advert', advertSchema);

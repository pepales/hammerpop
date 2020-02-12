const fs = require('fs');
const formidable = require('formidable');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');

const Advert = require('../models/advert');
const Category = require('../models/category');
const Tag = require('../models/tags');

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not upload',
      });
    }

    const { title, description, price, adtype, categories, tags } = fields;
    let arrayCategories = categories && categories.split(',');
    let arrayTags = tags && tags.split(',');

    if (!title || !title.length) {
      return res.status(400).json({
        error: 'title is required',
      });
    }

    if (!description || description.length < 10) {
      return res.status(400).json({
        error: 'Description is too short',
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: 'At least one category is required',
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: 'At least one tag is required',
      });
    }

    let advert = new Advert();
    advert.title = title;
    advert.description = description;
    advert.price = price;
    advert.adtype = adtype;
    advert.slug = slugify(title).toLowerCase();
    advert.metatitle = `${title} | ${process.env.APP_NAME}`;
    advert.metadesc = description.substring(0, 160);
    advert.postedBy = req.user._id;

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less then 1mb in size',
        });
      }
      advert.photo.data = fs.readFileSync(files.photo.path);
      advert.photo.contentType = files.photo.type;
    }

    advert.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
      Advert.findByIdAndUpdate(
        result._id,
        { $push: { categories: arrayCategories } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          Advert.findByIdAndUpdate(
            result._id,
            { $push: { tags: arrayTags } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            } else {
              res.json(result);
            }
          });
        }
      });
    });
  });
};

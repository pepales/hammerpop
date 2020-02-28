const fs = require('fs');
const formidable = require('formidable');
const slugify = require('slugify');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Advert = require('../models/advert');
const Tag = require('../models/tags');
const User = require('../models/user');

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not upload',
      });
    }

    const { title, description, price, adtype, tags } = fields;

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

    if (!adtype) {
      return res.status(400).json({
        error: 'Advert type must be buy or sell',
      });
    }

    if (!price) {
      return res.status(400).json({
        error: 'Price can`t be empty',
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
      var oldpath = files.photo.path;
      var newpath = '/images/adverts/' + files.photo.name;
      fs.rename(oldpath, newpath, err => {
        if (err) throw err;
        // eslint-disable-next-line no-console
        console.log('File uploaded and moved!');
      });
      advert.photo = `/images/adverts/${files.photo.name}`;
    }

    advert.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      // res.json(result);
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
    });
  });
};

exports.list = (req, res) => {
  Advert.find({})
    .select('_id title slug tags postedBy createdAt updatedAt')
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json(data);
    });
};

exports.listAllAdvertCategoriesTags = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let adverts;
  let tags;

  Advert.find({})

    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      '_id title slug description tags postedBy createdAt updatedAt price adtype photo'
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      adverts = data; // adverts

      // get all tags
      Tag.find({}).exec((err, t) => {
        if (err) {
          return res.json({
            error: errorHandler(err),
          });
        }
        tags = t;
        // return all adverts tags
        res.json({ adverts, tags, size: adverts.length });
      });
    });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Advert.findOne({ slug })
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select(
      '_id title slug description adtype price mtitle mdesc tags postedBy createdAt updatedAt'
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Advert.findOneAndRemove({ slug }).exec(err => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Advert deleted successfully',
    });
  });
};

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Advert.findOne({ slug }).exec((err, oldAdvert) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not upload',
        });
      }

      let slugBeforeMerge = oldAdvert.slug;
      oldAdvert = _.merge(oldAdvert, fields);
      oldAdvert.slug = slugBeforeMerge;

      const { description, tags } = fields;

      if (description) {
        oldAdvert.description = description;
      }

      if (tags) {
        oldAdvert.tags = tags.split(',');
      }

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: 'Image should be less then 1mb in size',
          });
        }
        var oldpath = files.photo.path;
        var newpath = '/images/adverts/' + files.photo.name;
        fs.rename(oldpath, newpath, err => {
          if (err) throw err;
          // eslint-disable-next-line no-console
          console.log('File uploaded and moved!');
        });
        oldAdvert.photo = `/images/adverts/${files.photo.name}`;
      }

      oldAdvert.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        // result.photo = undefined;
        res.json(result);
      });
    });
  });
};

exports.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Advert.findOne({ slug })
    .select('photo')
    .exec((err, advert) => {
      if (err || !advert) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      // res.set('Content-Type', advert.photo.contentType);
      return res.send(advert.photo);
    });
};

exports.listRelated = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3;
  const { _id, tags } = req.body.advert;

  Advert.find({ _id: { $ne: _id }, tags: { $in: tags } })
    .limit(limit)
    .populate('postedBy', '_id name username profile')
    .select('title slug description postedBy createdAt updatedAt')
    .exec((err, adverts) => {
      if (err) {
        return res.status(400).json({
          error: 'Adverts not found',
        });
      } else {
        res.json(adverts);
      }
    });
};

exports.listSearch = (req, res) => {
  const { search, tag, adtype, maxprice, minprice } = req.query;

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;
  let adverts;
  if (search) {
    Advert.find(
      {
        title: { $regex: search, $options: 'i' },
        tags: { $in: tag },
        adtype: adtype,
        price: { $lt: maxprice, $gt: minprice },
      }

      // we don't want to send
    )
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name username profile')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-photo')
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        adverts = data;
        res.json({ adverts, size: adverts.length });
      });
  }
};

exports.listByUser = (req, res) => {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    let userId = user._id;
    Advert.find({ postedBy: userId })
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name username')
      .select('_id title slug postedBy createdAt updatedAt')
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data);
      });
  });
};

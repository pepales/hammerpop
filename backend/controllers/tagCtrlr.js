const slugify = require('slugify');
const Tag = require('../models/tags');
const Advert = require('../models/advert');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });

  tag.save((err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data); // dont do this res.json({ tag: data });
  });
};

exports.list = (req, res) => {
  Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: 'Tag not found',
      });
    }
    Advert.find({ tags: tag })
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name')
      .select(
        '_id title slug description postedBy tags createdAt updatedAt price adtype'
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json({ tag: tag, adverts: data });
      });
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({ slug }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Tag deleted successfully',
    });
  });
};

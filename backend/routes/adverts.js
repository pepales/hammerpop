const express = require('express');

const router = express.Router();
const {
  create,
  list,
  listAllAdvertCategoriesTags,
  read,
  remove,
  update,
  photo,
  listRelated,
  listSearch,
} = require('../controllers/advertsCtrlr');

const { requireSignin, adminMiddleware } = require('../controllers/authCtrlr');

router.post('/advert', requireSignin, adminMiddleware, create);
router.get('/adverts', list);
router.post('/advert-categories-tags', listAllAdvertCategoriesTags);
router.get('/advert/:slug', read);
router.delete('/advert/:slug', requireSignin, adminMiddleware, remove);
router.put('/advert/:slug', requireSignin, adminMiddleware, update);
router.get('/advert/photo/:slug', photo);
router.post('/adverts/related', listRelated);
router.get('/adverts/search', listSearch);

module.exports = router;

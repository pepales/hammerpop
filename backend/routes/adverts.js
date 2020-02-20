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
  listByUser,
} = require('../controllers/advertsCtrlr');

const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
  canUpdateDeleteAdvert,
} = require('../controllers/authCtrlr');

router.post('/advert', requireSignin, adminMiddleware, create);
router.get('/adverts', list);
router.post('/advert-categories-tags', listAllAdvertCategoriesTags);
router.get('/advert/:slug', read);
router.delete('/advert/:slug', requireSignin, adminMiddleware, remove);
router.put('/advert/:slug', requireSignin, adminMiddleware, update);
router.get('/advert/photo/:slug', photo);
router.post('/adverts/related', listRelated);
router.get('/adverts/search', listSearch);

// auth user advert crud

router.post('/user/advert', requireSignin, authMiddleware, create);
router.get('/:username/adverts', listByUser);
// eslint-disable-next-line prettier/prettier
router.delete('/user/advert/:slug', requireSignin, authMiddleware, canUpdateDeleteAdvert, remove);
// eslint-disable-next-line prettier/prettier
router.put('/user/advert/:slug', requireSignin, authMiddleware, canUpdateDeleteAdvert, update);

module.exports = router;

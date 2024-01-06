const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const breedsRouter = require('./breeds');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/breeds', breedsRouter);

//test general
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


module.exports = router;
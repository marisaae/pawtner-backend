const router = require('express').Router();

const sessionRouter = require('./session');
const usersRouter = require('./users');
const breedsRouter = require('./breeds');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/breeds', breedsRouter);

//in production serve the React build files
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
//serve the frontend's index.html at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend/find-my-pawtner', 'build', 'index.html')
    )
  })
//serve static assets in the frontend's build folder
  router.use(express.static(path.resolve('../frontend/find-my-pawtner/build')));

  //serve the frontend's index.html file at all other routes not starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend/find-my-pawtner', 'build', 'index.html')
    )
  })
}

//add XSRF-token cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({})
  })
}

//test general
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


module.exports = router;
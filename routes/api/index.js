const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { Users } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js')

//test general
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

//test setTokenCookie
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await Users.findOne({
    where: {
      username: 'dean-tortie'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user })
}))

//test restoreUser
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
)

//test requireAuth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Users } = require('../../db/models');

const router = express.Router();
//login, logout routes

//login
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body;
        
        const user = await Users.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user
        })
    })
);

//logout
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' })
    }
);

//restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.safeUserObject(),
            });
        } else return res.json({});
    }
)

module.exports = router;
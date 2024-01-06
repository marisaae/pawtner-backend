const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restorUser } = require('../../utils/auth');
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
)



module.exports = router;
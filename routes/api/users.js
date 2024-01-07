const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Users } = require("../../db/models");

const router = express.Router();

//signup, profile, user's pet preference, user's saved pets

//signup
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { firstName, lastName, username, email, password } = req.body;
        const user = await Users.signup({ firstName, lastName, username, email, password });
        
        await setTokenCookie(res, user);

        return res.json({
            user
        })
    })
);


module.exports = router;

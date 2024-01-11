const express = require('express');
const asyncHandler = require("express-async-handler");

const { CatBreeds, DogBreeds } = require("../../db/models");

const router = express.Router();

//display breeds

router.get(
    '/:type',
    asyncHandler(async(req, res, next) => {
        const { type } = req.params;

        try {
            let breeds;
            if (type === "cats") {
               breeds = await CatBreeds.findAll()
            } else if (type === "dogs") {
                breeds = await DogBreeds.findAll();
            }
            return res.json({
                breeds
            })
        } catch (err) {
            err.status = 500;
            err.title = "Error retrieving breeds";
            err.errors = ["An error occurred while retrieving the list of breeds."]
            next(err);
        }
    })
)


module.exports = router;
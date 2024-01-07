const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Users, PetPreference, PetPreferenceCatBreeds, PetPreferenceDogBreeds } = require("../../db/models");

const router = express.Router();

//signup, profile, user's pet preference, user's saved pets

//signup
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await Users.signup({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    await setTokenCookie(res, user);

    return res.status(201).json({
      user,
    });
  })
);

//get profile
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!isNaN(id)) {
      try {
        const user = await Users.getCurrentUserById(id);
        if (user) {
          res.json(user.safeUserObject());
        } else {
          const err = new Error("User not found");
          err.status = 404;
          err.title = "User not found";
          err.errors = ["The user with the provided ID was not found."];
          return next(err);
        }
      } catch (err) {
        next(err);
      }
    } else {
        const err = new Error("Invalid user ID");
          err.status = 400;
          err.title = "Invalid user ID";
          err.errors = ["The ID provided is invalid."];
          return next(err);
    }
  })
);

//update users profile - only firstName, lastName, and bio
router.patch(
    '/:id',
    asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, bio } = req.body;

    const user = await Users.getCurrentUserById(id);

    if (user) {
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.bio = bio || user.bio;

      await user.save();
      res.json(user.safeUserObject());  
    } else {
        const err = new Error("User not found");
        err.status = 404;
        err.title = "User not found";
        err.errors = ["This user was not found."]
        return next(err);
    }
    })
)

//set user pet preference
router.post(
    '/:id/petPreference',
    asyncHandler( async(req, res, next) => {
        const { id } = req.params;
        const { petType, age, size, breed } = req.body;

        const user = await Users.findByPk(id);

        if(user) {
            const petPreference = await PetPreference.create({
                userId: id,
                petType,
                age,
                size
            });

            if (petType === 'dog') {
                await Promise.all(breed.map(async (breedId) => {
                    await PetPreferenceDogBreeds.create({
                        dogBreedId: breedId,
                        petPreferenceId: petPreference.id
                    })
                }))
            } else if (petType === 'cat') {
                await Promise.all(breed.map(async (breedId) => {
                    await PetPreferenceCatBreeds.create({
                        catBreedId: breedId,
                        petPreferenceId: petPreference.id
                    })
                }))
            }

            return res.status(201).json({
                petPreference,
            })
        } else {
            const err = new Error("User not found");
            err.status = 404;
            err.title = "User not found";
            err.errors = ["This user was not found."]
            return next(err);
        }

    })
)

module.exports = router;

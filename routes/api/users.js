const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Users,
  PetPreference,
  PetPreferenceCatBreeds,
  PetPreferenceDogBreeds,
  UserSavedPets,
} = require("../../db/models");

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
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, bio } = req.body;

    const user = await Users.getCurrentUserById(id);

    if (user) {
      user.set({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        bio: bio || user.bio,
      });

      await user.save();
      res.json(user.safeUserObject());
    } else {
      const err = new Error("User not found");
      err.status = 404;
      err.title = "User not found";
      err.errors = ["This user was not found."];
      return next(err);
    }
  })
);

//set user pet preference
router.post(
  "/:id/petPreference",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { petType, age, size, breed } = req.body;

    const user = await Users.findByPk(id);

    if (user) {
      const petPreference = await PetPreference.create({
        userId: id,
        petType,
        age,
        size,
      });

      if (petType === "dog") {
        await Promise.all(
          breed.map(async (breedId) => {
            await PetPreferenceDogBreeds.create({
              dogBreedId: breedId,
              petPreferenceId: petPreference.id,
            });
          })
        );
      } else if (petType === "cat") {
        await Promise.all(
          breed.map(async (breedId) => {
            await PetPreferenceCatBreeds.create({
              catBreedId: breedId,
              petPreferenceId: petPreference.id,
            });
          })
        );
      }

      return res.status(201).json({
        petPreference,
      });
    } else {
      const err = new Error("User not found");
      err.status = 404;
      err.title = "User not found";
      err.errors = ["This user was not found."];
      return next(err);
    }
  })
);

//update user pet preference
router.patch(
  "/:id/petPreference",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { petType, age, size, breed } = req.body;

    const user = await Users.findByPk(id);

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      err.title = "User not found";
      err.errors = ["This user was not found."];
      return next(err);
    }

    const userPetPreference = await PetPreference.findOne({
      where: { userId: user.id },
    });

    if (!userPetPreference) {
      const err = new Error("User's pet preference not found");
      err.status = 404;
      err.title = "User's pet preference not found";
      err.errors = ["This user's pet preference was not found."];
      return next(err);
    }

    userPetPreference.set({
      petType: petType || userPetPreference.petType,
      age: age || userPetPreference.age,
      size: size || userPetPreference.size,
    });
    await userPetPreference.save();

    const petPreferenceId = userPetPreference.id;
    
    await PetPreferenceDogBreeds.destroy({
      where: { petPreferenceId: petPreferenceId },
    });

    await PetPreferenceCatBreeds.destroy({
      where: { petPreferenceId: petPreferenceId },
    });
    
    if (petType === "dog") {

      await Promise.all(
        breed.map(async (breedId) => {
          await PetPreferenceDogBreeds.create({
            dogBreedId: breedId,
            petPreferenceId: userPetPreference.id,
          });
        })
      );
    } else if (petType === "cat") {
      await Promise.all(
        breed.map(async (breedId) => {
          await PetPreferenceCatBreeds.create({
            catBreedId: breedId,
            petPreferenceId: userPetPreference.id,
          });
        })
      );
    }

    return res.status(200).json({
      userPetPreference,
    });
  })
);

//delete user pet preference
router.delete(
  "/:id/petpreference",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await Users.findByPk(id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      err.title = "User not found";
      err.errors = ["This user was not found."];
      return next(err);
    }

    await PetPreference.destroy({
      where: { userId: user.id },
    });

    return res.json({ message: "Pet Preference successfully deleted" });
  })
);

//set users saved pets
router.post(
  "/:id/savedPets",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { petId } = req.body;

    const user = await Users.findByPk(id);

    if (user) {
      const savedPet = await UserSavedPets.create({
        userId: user.id,
        petApiId: petId,
      });

      return res.status(201).json({
        savedPet,
      });
    } else {
      const err = new Error("User not found");
      err.status = 404;
      err.title = "User not found";
      err.errors = ["This user was not found."];
      return next(err);
    }
  })
);

//update users saved pets

//delete users saved pets
module.exports = router;

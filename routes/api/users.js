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

const { userNotFound } = require("../../utils/userUtils");

const router = express.Router();

//signup, profile, user's pet preference, user's saved pets

//signup
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await Users.signup({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    setTokenCookie(res, user);

    return res.status(201).json({
      user,
    });
  } catch (error) {
    if (error.status === 400) {
      res.status(400).json({ message: error.message });
    } else {
      // Handle other types of errors
      next(error);
    }
  }
  })
);

//get profile - check on error handling?
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
          userNotFound(next);
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
    try {
      const user = await Users.getCurrentUserById(id);
      if (!user) {
        userNotFound(next);
      }

      user.set({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        bio: bio || user.bio,
      });

      await user.save();
      res.json(user.safeUserObject());
    } catch (err) {
      err.status = 500;
      err.title = "Error updating profile.";
      err.errors = ["There was an error updating your profile."];
      next(err);
    }
  })
);

//set user pet preference
router.post(
  "/:id/petPreference",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { petType, age, size, breed } = req.body;

    try {
      const user = await Users.findByPk(id);

      if (!user) {
        userNotFound(next);
      }

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
      return res.status(201).json({ petPreference });
    } catch (err) {
      err.status = 500;
      err.title = "Error saving pet preference.";
      err.errors = ["There was an error saving your pet preference."];
      next(err);
    }
  })
);

//update user pet preference
router.patch(
  "/:id/petPreference",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { petType, age, size, breed } = req.body;

    try {
      const user = await Users.findByPk(id);

      if (!user) {
        userNotFound(next);
      }

      const userPetPreference = await PetPreference.findOne({
        where: { userId: user.id },
      });

      if (!userPetPreference) {
        const err = new Error("Pet preference not found");
        err.status = 404;
        err.title = "Pet preference not found";
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
      return res.status(200).json({ userPetPreference });
    } catch (err) {
      err.status = 500;
      err.title = "Error updating Pet Preference.";
      err.errors = ["There was an error updating your Pet Preference."];
      next(err);
    }
  })
);

//delete user pet preference
router.delete(
  "/:id/petpreference",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await Users.findByPk(id);

      if (!user) {
        userNotFound(next);
      }

      await PetPreference.destroy({
        where: { userId: user.id },
      });

      return res
        .status(200)
        .json({ message: "Pet Preference successfully deleted." });
    } catch (err) {
      err.status = 500;
      err.title = "Error deleting pet preference.";
      err.errors = ["There was an error deleting this pet preference."];
      next(err);
    }
  })
);

//set users saved pets
router.post(
  "/:id/savedPets",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { petId } = req.body;

    try {
      const user = await Users.findByPk(id);

      if (!user) {
        userNotFound(next);
      }
      const savedPet = await UserSavedPets.create({
        userId: user.id,
        petApiId: petId,
      });

      return res.status(201).json({
        savedPet,
      });
    } catch (err) {
      err.status = 500;
      err.title = "Error saving pet.";
      err.errors = ["There was an error saving this pet."];
      next(err);
    }
  })
);

//delete users saved pets
router.delete(
  "/:id/savedPets",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { petId } = req.body;
    try {
      const user = await Users.findByPk(id);
      if (!user) {
        userNotFound(next);
      }

      await UserSavedPets.destroy({
        where: {
          userId: user.id,
          petApiId: petId,
        },
      });

      return res.status(200).json({ message: "The pet has been removed" });
    } catch (err) {
      err.status = 500;
      err.title = "Error removing pet.";
      err.errors = ["There was an error removing this pet."];
      next(err);
    }
  })
);

module.exports = router;

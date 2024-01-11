const userNotFound = (next) => {
    const err = new Error("User not found");
    err.status = 404;
    err.title = "User not found";
    err.errors = ["This user was not found."];
    return next(err);
};

module.exports = { userNotFound };
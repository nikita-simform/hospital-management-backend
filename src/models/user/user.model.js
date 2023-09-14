const User = require('./user.mongo');

async function isExistingUser(email) {
    const existingUser = await User.findOne({
        email: email
    });

    return existingUser;
}

async function doSignup(user) {
    const newUser = new User(user);
    const newUserInserted = await User.create(
        newUser
    )
    return newUserInserted;
}

module.exports = {
    isExistingUser,
    doSignup,
}
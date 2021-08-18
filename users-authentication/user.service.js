const User = require("./user.model");
const Error = require("../utils/error");
const resObject = require("../utils/response");

exports.getAllUsers = async () => {
    const users = await User.find().sort("-created_at");
    return resObject(users, "Successfully fetched all users");
}

exports.deleteUser = async (userId) => {
    await User.deleteOne({_id: userId})
    return resObject(undefined, "Successfully deleted a user")
}
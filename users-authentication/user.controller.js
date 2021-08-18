const UserServices = require("./user.service");
const { handleError } = require("../controllers/error.controller");

exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await UserServices.getAllUsers();
        return res.status(200).send(result);
    } catch (err) {
        handleError(err, next)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await UserServices.deleteUser(userId);
        return res.status(200).send(result);
    } catch (err) {
        handleError(err, next)
    }
}


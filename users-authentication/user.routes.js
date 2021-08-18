const express = require("express");

const router = express.Router();

// import relative dependencies
const UserController = require("./user.controller");

router.get("/users", UserController.getAllUsers);

router.delete("/users/:userId", UserController.deleteUser);

module.exports = router;
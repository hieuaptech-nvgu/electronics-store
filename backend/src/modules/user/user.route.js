const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const {validateCreateUser, validateUpdateUser} = require("../../middlewares/validator.user");

router.post("/user", validateCreateUser, UserController.createUser);
router.patch("/user/:id", validateUpdateUser, UserController.updateUser);

module.exports = router;
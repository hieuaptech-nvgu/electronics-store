const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../../middlewares/validator.user");
const { verifyAdmin } = require("../../middlewares/admin.middleware");
const { verifyAccessToken } = require("../../middlewares/auth.middleware");

router.post(
  "/",
  verifyAccessToken,
  verifyAdmin,
  validateCreateUser,
  UserController.createUser
);
router.patch(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  validateUpdateUser,
  UserController.updateUser
);
router.patch(
  "/:id/activate",
  verifyAccessToken,
  verifyAdmin,
  UserController.activateUser
);
router.patch(
  "/:id/deactivate",
  verifyAccessToken,
  verifyAdmin,
  UserController.deactivateUser
);
router.delete(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  UserController.deleteUser
);

module.exports = router;

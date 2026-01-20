const express = require("express");
const router = express.Router();
const CategoryController = require("./category.controller");
const {validateCreateCategory, validateUpdateCategory} = require("../../middlewares/category.middleware");
const {validateId} = require("../../middlewares/validateObjectId.middleware");
const { verifyAdmin } = require("../../middlewares/admin.middleware");
const { verifyAccessToken } = require("../../middlewares/auth.middleware");

router.get("/", CategoryController.findAllCategoryActive);

router.get("/:id", validateId, CategoryController.findCategoryById);

router.post(
  "/",
  verifyAccessToken,
  verifyAdmin,
  validateCreateCategory,
  CategoryController.createCategory
);
router.patch(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  validateUpdateCategory,
  CategoryController.updateCategory
);
router.patch(
  "/:id/activate",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  CategoryController.activateCategory
);
router.patch(
  "/:id/deactivate",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  CategoryController.deactivateCategory
);

module.exports = router;

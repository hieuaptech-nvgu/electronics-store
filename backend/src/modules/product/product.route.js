const express = require("express");
const router = express.Router();

const ProductController = require("./product.controller");

const { verifyAdmin } = require("../../middlewares/admin.middleware");
const { verifyAccessToken } = require("../../middlewares/auth.middleware");
const { validateId } = require("../../middlewares/validateObjectId.middleware");
const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("../../middlewares/product.middleware");

/* ================= PUBLIC ================= */
// Get all product
router.get("/", ProductController.getProducts);

// Get product by slug
router.get("/slug/:slug", ProductController.getProductBySlug);

// Get product by id
router.get("/:id", validateId, ProductController.getProductById);

/* ================= PRODUCT (ADMIN) ================= */

// Create product
router.post(
  "/",
  verifyAccessToken,
  verifyAdmin,
  validateCreateProduct,
  ProductController.createProduct,
);

// Update product
router.put(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  validateUpdateProduct,
  ProductController.updateProduct,
);

// Activate product
router.patch(
  "/:id/activate",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.activateProduct,
);

// Deactivate product
router.patch(
  "/:id/deactivate",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.deactivateProduct,
);

// Restore product
router.patch(
  "/:id/restore",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.restoreProduct,
);

// Soft delete product
router.delete(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.softDeleteProduct,
);

/* ================= VARIANT (ADMIN) ================= */

// Create variant
router.post(
  "/:productId/variants",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.createVariant,
);

// Update variant
router.put(
  "/variants/:variantId",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.updateVariant,
);

// Activate variant
router.patch(
  "/variants/:variantId/activate",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.activateVariant,
);

// Deactivate variant
router.patch(
  "/variants/:variantId/deactivate",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.deactivateVariant,
);

// Soft delete variant
router.delete(
  "/variants/:variantId",
  verifyAccessToken,
  verifyAdmin,
  validateId,
  ProductController.softDeleteVariant,
);

module.exports = router;

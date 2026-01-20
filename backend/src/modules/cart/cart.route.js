const express = require("express");
const router = express.Router();

const CartController = require("./cart.controller");
const { verifyAccessToken } = require("../../middlewares/auth.middleware");
const { validateId } = require("../../middlewares/validateObjectId.middleware");

/* ================= CART ================= */

// lấy giỏ hàng của tôi
router.get("/", verifyAccessToken, CartController.getMyCart);

// thêm sản phẩm vào giỏ
router.post("/", verifyAccessToken, CartController.addToCart);

// cập nhật số lượng 1 item
router.put(
  "/:variantId",
  verifyAccessToken,
  validateId("variantId"),
  CartController.updateQuantity,
);

// xóa 1 item khỏi giỏ
router.delete(
  "/:variantId",
  verifyAccessToken,
  validateId("variantId"),
  CartController.removeItem,
);

// clear toàn bộ giỏ hàng
router.delete("/", verifyAccessToken, CartController.clearCart);

module.exports = router;

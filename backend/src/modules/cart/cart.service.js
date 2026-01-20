const CartRepository = require("./cart.repository");
const ProductVariantRepository = require("../product/productVariant.repository");
const HttpError = require("../../utils/error");

class CartService {
  async getCart(userId) {
    return await CartRepository.findOrCreate(userId);
  }

  async addToCart({ userId, productId, variantId, quantity }) {
    if (quantity <= 0) {
      throw new HttpError(400, "Quantity must be greater than 0");
    }

    const variant = await ProductVariantRepository.findByIdActive(variantId);
    if (!variant) {
      throw new HttpError(404, "Variant not found or inactive");
    }

    const updated = await CartRepository.increaseItem({
      userId,
      variantId,
      quantity,
    });

    if (updated) return updated;

    return await CartRepository.addItem({
      userId,
      productId,
      variantId,
      quantity,
    });
  }

  async updateQuantity({ userId, variantId, quantity }) {
    if (quantity <= 0) {
      throw new HttpError(400, "Quantity must be greater than 0");
    }

    const cart = await CartRepository.updateQuantity({
      userId,
      variantId,
      quantity,
    });

    if (!cart) {
      throw new HttpError(404, "Item not found in cart");
    }

    return cart;
  }

  async removeItem({ userId, variantId }) {
    return await CartRepository.removeItem({ userId, variantId });
  }

  async clearCart(userId) {
    return await CartRepository.clear(userId);
  }
}

module.exports = new CartService();

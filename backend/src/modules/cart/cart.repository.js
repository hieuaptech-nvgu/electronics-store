const Cart = require("./cart.schema");

class CartRepository {
  async findByUserId(userId) {
    return await Cart.findOne({ userId });
  }

  async findOrCreate(userId) {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    return cart;
  }

  async addItem({ userId, productId, variantId, quantity }) {
    return await Cart.findOneAndUpdate(
      {
        userId,
        "items.variantId": { $ne: variantId },
      },
      {
        $push: {
          items: { productId, variantId, quantity },
        },
      },
      { new: true },
    );
  }

  async increaseItem({ userId, variantId, quantity }) {
    return Cart.findOneAndUpdate(
      { userId, "items.variantId": variantId },
      { $inc: { "items.$.quantity": quantity } },
      { new: true },
    );
  }

  async updateQuantity({ userId, variantId, quantity }) {
    return Cart.findOneAndUpdate(
      { userId, "items.variantId": variantId },
      { $set: { "items.$.quantity": quantity } },
      { new: true },
    );
  }

  async removeItem({ userId, variantId }) {
    return Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { variantId } } },
      { new: true },
    );
  }

  async clear(userId) {
    return Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true },
    );
  }
}

module.exports = new CartRepository();

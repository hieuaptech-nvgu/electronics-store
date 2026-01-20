const CartService = require("./cart.service");

class CartController {
  async getMyCart(req, res, next) {
    try {
      const userId = req.user.id;

      const cart = await CartService.getCart(userId);

      res.status(200).json({
        source: "mongodb",
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  }

  async addToCart(req, res, next) {
    try {
      const userId = req.user.id;

      const cart = await CartService.addToCart({
        userId,
        ...req.body,
      });

      res.status(200).json({
        source: "mongodb",
        message: "Added to cart",
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateQuantity(req, res, next) {
    try {
      const userId = req.user.id;
      const { variantId } = req.params;
      const { quantity } = req.body;

      const cart = await CartService.updateQuantity({
        userId,
        variantId,
        quantity,
      });

      res.status(200).json({
        source: "mongodb",
        message: "Cart updated",
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  }

  async removeItem(req, res, next) {
    try {
      const userId = req.user.id;
      const { variantId } = req.params;

      const cart = await CartService.removeItem({ userId, variantId });

      res.status(200).json({
        source: "mongodb",
        message: "Item removed",
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  }

  async clearCart(req, res, next) {
    try {
      const userId = req.user.id;

      const cart = await CartService.clearCart(userId);

      res.status(200).json({
        source: "mongodb",
        message: "Cart cleared",
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CartController();

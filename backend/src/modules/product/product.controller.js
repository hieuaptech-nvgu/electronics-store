const redisClient = require("../../config/redis");
const ProductService = require("./product.service");


const CACHE_KEY_ALL = "products:all";
const CACHE_TTL = 60 * 5; // 5 phút

const clearCache = async (id, slug) => {
  const keys = [CACHE_KEY_ALL];
  if (id) keys.push(`products:${id}`);
  if (slug) keys.push(`products:slug:${slug}`);

  await redisClient.del(keys);
};

class ProductController {
  /* ================= PRODUCT ================= */

  async createProduct(req, res, next) {
    try {
      const product = await ProductService.createProduct(req.body);
      await clearCache();

      res.status(201).json({
        source: "mongodb",
        message: "Product created successfully",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProductBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const key = `products:slug:${slug}`;

      const cached = await redisClient.get(key);
      if (cached) {
        return res.status(200).json({
          source: "redis",
          data: JSON.parse(cached),
        });
      }

      const result = await ProductService.getProductBySlug(slug);
      await redisClient.setEx(key, CACHE_TTL, JSON.stringify(result));

      res.status(200).json({
        source: "mongodb",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const key = `products:${id}`;

      const cached = await redisClient.get(key);
      if (cached) {
        return res.status(200).json({
          source: "redis",
          data: JSON.parse(cached),
        });
      }

      const result = await ProductService.getProductById(id);
      await redisClient.setEx(key, CACHE_TTL, JSON.stringify(result));

      res.status(200).json({
        source: "mongodb",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProducts(req, res, next) {
    try {
      const query = req.query;

      // cache key theo query (rất quan trọng)
      const cacheKey = `products:list:${JSON.stringify(query)}`;

      const cached = await redisClient.get(cacheKey);
      if (cached) {
        return res.json({
          source: "redis",
          data: JSON.parse(cached),
        });
      }

      const products = await ProductService.getProduct(query);

      await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(products));

      res.status(200).json({
        source: "mongodb",
        data: products,
 
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id, req.body);

      await clearCache(id, product.slug);

      res.status(200).json({
        source: "mongodb",
        message: "Product updated successfully",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async activateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.activateProduct(id);

      await clearCache(id, product.slug);

      res.status(200).json({
        source: "mongodb",
        message: "Product activated",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async deactivateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.deactivateProduct(id);

      await clearCache(id, product.slug);

      res.status(200).json({
        source: "mongodb",
        message: "Product deactivated",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async restoreProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.restoreProduct(id);

      await clearCache(id, product.slug);

      res.status(200).json({
        source: "mongodb",
        message: "Product restored",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async softDeleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.softDeleteProduct(id);

      await clearCache();

      res.status(200).json({
        source: "mongodb",
        message: "Product deleted",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  /* ================= VARIANT ================= */

  async createVariant(req, res, next) {
    try {
      const { productId } = req.params;
      const variant = await ProductService.createVariant(productId, req.body);

      await clearCache(productId);

      res.status(201).json({
        source: "mongodb",
        message: "Variant created successfully",
        data: variant,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateVariant(req, res, next) {
    try {
      const { variantId } = req.params;
      const variant = await ProductService.updateVariant(variantId, req.body);

      await clearCache(variant.productId);

      res.status(200).json({
        source: "mongodb",
        message: "Variant updated successfully",
        data: variant,
      });
    } catch (err) {
      next(err);
    }
  }

  async activateVariant(req, res, next) {
    try {
      const { variantId } = req.params;
      const variant = await ProductService.activateVariant(variantId);

      await clearCache(variant.productId);

      res.status(200).json({
        source: "mongodb",
        message: "Variant activated",
        data: variant,
      });
    } catch (err) {
      next(err);
    }
  }

  async deactivateVariant(req, res, next) {
    try {
      const { variantId } = req.params;
      const variant = await ProductService.deactivateVariant(variantId);

      await clearCache(variant.productId);

      res.status(200).json({
        source: "mongodb",
        message: "Variant deactivated",
        data: variant,
      });
    } catch (err) {
      next(err);
    }
  }

  async softDeleteVariant(req, res, next) {
    try {
      const { variantId } = req.params;
      const variant = await ProductService.softDeleteVariant(variantId);

      await clearCache(variant.productId);

      res.status(200).json({
        source: "mongodb",
        message: "Variant deleted",
        data: variant,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();

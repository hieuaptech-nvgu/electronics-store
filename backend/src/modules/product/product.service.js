const ProductRepository = require("./product.repository");
const ProductVariantRepository = require("./productVariant.repository");
const HttpError = require("../../utils/error");
const mongoose = require("mongoose");


class ProductService {
  /* ================= PRODUCT ================= */

  async createProduct(data) {
    const slugExists = await ProductRepository.existsBySlug(data.slug);
    if (slugExists) {
      throw new HttpError(400, "Slug already exists");
    }

    if (data.type === "prebuilt") {
      delete data.componentType;
      data.hasVariants = false;
    }

    return await ProductRepository.create(data);
  }

  async getProductBySlug(slug) {
    const product = await ProductRepository.findBySlug(slug);
    if (!product) {
      throw new HttpError(404, "Product not found");
    }

    let variants = [];
    if (product.hasVariants) {
      variants = await ProductVariantRepository.findByProductIdActive(
        product._id,
      );
    }

    return { product, variants };
  }

  async getProductById(id) {
    const product = await ProductRepository.findByIdIncludeDeleted(id);
    if (!product) {
      throw new HttpError(404, "Product not found");
    }

    let variants = [];
    if (product.hasVariants) {
      variants = await ProductVariantRepository.findByProductIdActive(
        product._id,
      );
    }

    return { product, variants };
  }

  async updateProduct(id, data) {
    const product = await ProductRepository.findByIdNotDeleted(id);
    if (!product) {
      throw new HttpError(404, "Product not found");
    }

    if (data.type && data.type !== product.type) {
      throw new HttpError(400, "Cannot change product type");
    }

    if (data.slug && data.slug !== product.slug) {
      const exists = await ProductRepository.existsBySlug(data.slug);
      if (exists) {
        throw new HttpError(400, "Slug already exists");
      }
    }

    return await ProductRepository.update(id, data);
  }

  async getProduct(query){
    const filter = {isDeleted: false};
    if(query.keyword){
      filter.name = {$regex: query.keyword, $options: "i"};
    }

    return await ProductRepository.findWithQuery(filter, query);
  }

  async activateProduct(id) {
    const product = await ProductRepository.findByIdNotDeleted(id);
    if (!product) {
      throw new HttpError(404, "Product not found");
    }

    return await ProductRepository.activate(id);
  }

  async deactivateProduct(id) {
    const product = await ProductRepository.findByIdNotDeleted(id);
    if (!product) {
      throw new HttpError(404, "Product not found");
    }

    return await ProductRepository.deactivate(id);
  }

  async softDeleteProduct(id) {
    const product = await ProductRepository.findByIdNotDeleted(id);
    if (!product) {
      throw new HttpError(404, "Product not found");
    }

    if (product.hasVariants) {
      const variants = await ProductVariantRepository.findByProductIdActive(
        product._id,
      );

      for (const variant of variants) {
        await ProductVariantRepository.softDelete(variant._id);
      }
    }

    return await ProductRepository.softDelete(id);
  }

  async restoreProduct(id) {
    const product = await ProductRepository.findByIdIncludeDeleted(id);
    if (!product || !product.isDeleted) {
      throw new HttpError(404, "Product not found or not deleted");
    }

    return await ProductRepository.restore(id);
  }

    /* ================= VARIANT ================= */

  async createVariant(data) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const [variant] = await ProductVariantRepository.create(data, session);
      await ProductRepository.markHasVariants(data.productId, session);
      await session.commitTransaction();
      return variant;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async updateVariant(variantId, data) {
    const variant =
      await ProductVariantRepository.findByIdNotDeleted(variantId);

    if (!variant) {
      throw new HttpError(404, "Variant not found");
    }

    return await ProductVariantRepository.update(variantId, data);
  }

  async activateVariant(variantId) {
    return await ProductVariantRepository.activate(variantId);
  }

  async deactivateVariant(variantId) {
    return await ProductVariantRepository.deactivate(variantId);
  }

  async softDeleteVariant(variantId) {
    return await ProductVariantRepository.softDelete(variantId);
  }
}

module.exports = new ProductService();

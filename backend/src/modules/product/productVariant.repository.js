const ProductVariant = require("./variant.schema");

class ProductVariantRepository {
  async create(data, session = null) {
    return await ProductVariant.create([data], { session });
  }

  async findByIdActive(id) {
    return await ProductVariant.findOne({
      _id: id,
      isDeleted: false,
      isActive: true,
    });
  }

  async findBySKU(sku) {
    return await ProductVariant.findOne({
      sku,
      isDeleted: false,
    });
  }

  async existsBySKU(sku) {
    return await ProductVariant.exists({
      sku,
      isDeleted: false,
    });
  }

  async findByProductIdActive(productId) {
    return await ProductVariant.find({
      productId,
      isDeleted: false,
      isActive: true,
    });
  }

  async findByIdIncludeDeleted(id) {
    return await ProductVariant.findById(id);
  }

  async findAllIncludeDeleted() {
    return await ProductVariant.find();
  }

  async findAllActive() {
    return await ProductVariant.find({
      isDeleted: false,
      isActive: true,
    });
  }

  async findAllDisabled() {
    return await ProductVariant.find({
      isDeleted: false,
      isActive: false,
    });
  }

  async findAllDeleted() {
    return await ProductVariant.find({ isDeleted: true });
  }

  async findByIdNotDeleted(id) {
    return await ProductVariant.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async deactivate(id) {
    return await ProductVariant.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isActive: false },
      { new: true },
    );
  }

  async activate(id) {
    return await ProductVariant.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isActive: true },
      { new: true },
    );
  }

  async restore(id) {
    return await ProductVariant.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { isDeleted: false, isActive: true },
      { new: true },
    );
  }

  async softDelete(id) {
    return await ProductVariant.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, isActive: false },
      { new: true },
    );
  }

  async update(id, data) {
    return await ProductVariant.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async updateStock(id, stock) {
    return await ProductVariant.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { stock },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}

module.exports = new ProductVariantRepository();

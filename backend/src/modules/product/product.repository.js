const Product = require("./product.schema");

class ProductRepository {
  async create(product) {
    return await Product.create(product);
  }

  async findByIdActive(id) {
    return await Product.findOne({ _id: id, isDeleted: false, isActive: true });
  }

  async findBySlug(slug) {
    return await Product.findOne({ slug, isDeleted: false, isActive: true });
  }

  async existsBySlug(slug) {
    return await Product.exists({
      slug,
      isDeleted: false,
    });
  }

  async findByIdIncludeDeleted(id) {
    return await Product.findById(id);
  }

  async findAllIncludeDeleted() {
    return await Product.find();
  }

  async findAllActive() {
    return await Product.find({ isDeleted: false, isActive: true });
  }

  async findAllDisabled() {
    return await Product.find({ isDeleted: false, isActive: false });
  }

  async findAllDeleted() {
    return await Product.find({ isDeleted: true });
  }

  async findByIdNotDeleted(id) {
    return await Product.findOne({ _id: id, isDeleted: false });
  }

  async deactivate(id) {
    return await Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isActive: false },
      { new: true }
    );
  }

  async activate(id) {
    return await Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isActive: true },
      { new: true }
    );
  }

  async restore(id) {
    return await Product.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { isDeleted: false, isActive: true },
      { new: true }
    );
  }

  async softDelete(id) {
    return await Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, isActive: false },
      { new: true }
    );
  }

  async update(id, data) {
    return await Product.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
      new: true,
      runValidators: true,
    });
  }
}

module.exports = new ProductRepository();
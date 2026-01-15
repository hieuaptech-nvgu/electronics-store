const Category = require("./category.schema");

class CategoryRepository {
  async create(category) {
    return await Category.create(category);
  }

  async findByIdActive(id) {
    return await Category.findOne({
      _id: id,
      isDeleted: false,
      isActive: true,
    });
  }

  async findBySlug(slug) {
    return await Category.findOne({ slug, isDeleted: false, isActive: true });
  }

  async existsBySlug(slug) {
    return await Category.exists({
      slug,
      isDeleted: false,
    });
  }

  async findByIdIncludeDeleted(id) {
    return await Category.findById(id);
  }

  async findAllIncludeDeleted() {
    return await Category.find();
  }

  async findAllActive() {
    return await Category.find({ isDeleted: false, isActive: true });
  }

  async findAllDisabled() {
    return await Category.find({ isDeleted: false, isActive: false });
  }

  async findAllDeleted() {
    return await Category.find({ isDeleted: true });
  }

  async findByIdNotDeleted(id) {
    return await Category.findOne({ _id: id, isDeleted: false });
  }

  async deactivate(id) {
    return await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isActive: false },
      { new: true }
    );
  }

  async activate(id) {
    return await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isActive: true },
      { new: true }
    );
  }

  async restore(id) {
    return await Category.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { isDeleted: false, isActive: true },
      { new: true }
    );
  }

  async softDelete(id) {
    return await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, isActive: false },
      { new: true }
    );
  }

  async update(id, data) {
    return await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true }
    );
  }
}

module.exports = new CategoryRepository();

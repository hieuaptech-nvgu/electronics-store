const CategoryRepository = require("./category.repository");
const HttpError = require("../../utils/error");

class CategoryService {
  async createCategory(data) {
    const { name, slug } = data;

    const duplicateSlug = await CategoryRepository.existsBySlug(slug);
    if (duplicateSlug) {
      throw new HttpError(400, "Slug already exists");
    }

    return await CategoryRepository.create({ name, slug });
  }

  async findCategoryById(id) {
    const category = await CategoryRepository.findByIdNotDeleted(id);
    if (!category) {
      throw new HttpError(404, "Category not found");
    }
    return category;
  }

  async updateCategory(id, data) {
    const { name, slug } = data;

    const category = await CategoryRepository.findByIdNotDeleted(id);
    if (!category) {
      throw new HttpError(404, "Category not found");
    }

    if (slug && slug !== category.slug) {
      const duplicateSlug = await CategoryRepository.existsBySlug(slug);
      if (duplicateSlug) {
        throw new HttpError(400, "Slug already exists");
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;

    const updatedCategory = await CategoryRepository.update(id, updateData);
    if (!updatedCategory) {
      throw new HttpError(409, "Category is locked or deleted");
    }

    return updatedCategory;
  }

  async findAllCategoryActive() {
    const categories = await CategoryRepository.findAllActive();
    return categories; 
  }

  async activateCategory(id) {
    const category = await CategoryRepository.activate(id);
    if (!category) {
      throw new HttpError(404, "Category not found or deleted");
    }
    return category;
  }

  async deactivateCategory(id) {
    const category = await CategoryRepository.deactivate(id);
    if (!category) {
      throw new HttpError(404, "Category not found or deleted");
    }
    return category;
  }

  async restoreCategory(id) {
    const category = await CategoryRepository.restore(id);
    if (!category) {
      throw new HttpError(404, "Category not found");
    }
    return category;
  }

  async softDeleteCategory(id) {
    const category = await CategoryRepository.findByIdNotDeleted(id);
    if (!category) {
      throw new HttpError(404, "Category not found");
    }
    return await CategoryRepository.softDelete(id);
  }
}

module.exports = new CategoryService();

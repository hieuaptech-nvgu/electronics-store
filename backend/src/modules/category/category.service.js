const CategoryRepository = require("./category.repository");

class CategoryService {
  async createCategory(data) {
    const { name, slug } = data;
    const duplicateSlug = await CategoryRepository.existsBySlug(slug);
    if (duplicateSlug) {
      throw new Error("Slug already exists");
    }

    const newCategory = await CategoryRepository.create({
      name,
      slug,
    });

    return newCategory;
  }

  async findCategoryById(id){
    const category = await CategoryRepository.findByIdNotDeleted(id);
    return category;
  }

  async updateCategory(id, data) {
    const { name, slug } = data;
    const category = await CategoryRepository.findByIdNotDeleted(id);
    if (!category) {
      throw new Error("Category not found");
    }

    if (slug && slug !== category.slug) {
      const duplicateSlug = await CategoryRepository.existsBySlug(slug);
      if (duplicateSlug) {
        throw new Error("Slug already exists");
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;

    const updatedCategory = await CategoryRepository.update(id, updateData);

    if (!updatedCategory) {
      throw new Error("Category not found or locked");
    }

    return updatedCategory;
  }

  async findAllCategoryActive(){
    return await CategoryRepository.findAllActive();
  }

  async activateCategory(id) {
    const category = await CategoryRepository.activate(id);

    if (!category) {
      throw new Error("Category not found or deleted");
    }

    return category;
  }

  async deactivateCategory(id) {
    const category = await CategoryRepository.deactivate(id);

    if (!category) {
      throw new Error("Category not found or deleted");
    }

    return category;
  }

  async restoreCategory(id) {
    const category = await CategoryRepository.restore(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async softDeleteCategory(id) {
    const category = await CategoryRepository.findByIdNotDeleted(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return await CategoryRepository.softDelete(id);
  }
}

module.exports = new CategoryService();

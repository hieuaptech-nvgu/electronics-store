const CategoryService = require("./category.service");
const redisClient = require("../../config/redis");

const CACHE_KEY_ALL = "categories:all";
const CACHE_TTL = 60 * 5; // 5 phút

const clearCache = async (id) => {
  const keys = [CACHE_KEY_ALL];
  if (id) keys.push(`categories:${id}`);
  await redisClient.del(keys);
};

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const category = await CategoryService.createCategory(req.body);
      await clearCache();

      res.status(201).json({
        source: "mongodb",
        message: "Category created successfully",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  async findCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const key = `categories:${id}`;

      const cached = await redisClient.get(key);
      if (cached) {
        return res.json({
          source: "redis",
          data: JSON.parse(cached),
        });
      }

      const category = await CategoryService.findCategoryById(id);

      await redisClient.setEx(key, CACHE_TTL, JSON.stringify(category));

      return res.json({
        source: "mongodb",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  async findAllCategoryActive(req, res, next) {
    try {
      const cached = await redisClient.get(CACHE_KEY_ALL);
      if (cached) {
        return res.json({
          source: "redis",
          data: JSON.parse(cached),
        });
      }

      const categories = await CategoryService.findAllCategoryActive();

      await redisClient.setEx(
        CACHE_KEY_ALL,
        CACHE_TTL,
        JSON.stringify(categories)
      );

      return res.json({
        source: "mongodb",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.updateCategory(id, req.body);

      await clearCache(id);

      res.json({
        source: "mongodb",
        message: "Category updated successfully",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  async activateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.activateCategory(id);
      await clearCache(id);

      res.json({
        source: "mongodb",
        message: "Category activated",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  async deactivateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.deactivateCategory(id);
      await clearCache(id);

      res.json({
        source: "mongodb",
        message: "Category deactivated",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  async restoreCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.restoreCategory(id);
      await clearCache(id);

      res.json({
        source: "mongodb",
        message: "Category restored",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }

  async softDeleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.softDeleteCategory(id);
      await clearCache();

      res.json({
        source: "mongodb",
        message: "Category deleted",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CategoryController();

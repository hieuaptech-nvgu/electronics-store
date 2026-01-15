const CategoryService = require("./category.service");
const redisClient = require("../../config/redis");

const CACHE_KEY_ALL = "categories:all";
const CACHE_TTL = 60 * 5; //5 minutes

const clearCache = async (id) => {
  try {
    const keys = [CACHE_KEY_ALL];
    if (id) {
      keys.push(`categories:${id}`);
    }
 
    await redisClient.del(keys);
  } catch (error) {
    console.error("Redis clear cache error:", error);
  }
};

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const category = await CategoryService.createCategory(req.body);

      await clearCache();

      res
        .status(201)
        .json({ message: "Category created successful", data: category });
    } catch (error) {
      next(error);
    }
  }

  async findCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const keyDetail = `categories:${id}`;
      const cachedData = await redisClient.get(keyDetail);
      if (cachedData) {
        return res.json({ source: "redis", data: JSON.parse(cachedData) });
      }

      const category = await CategoryService.findCategoryById(id);

      if (!category) {
        return res.status(404).json({message: "Category not found"});
      }

      await redisClient.setEx(keyDetail, CACHE_TTL, JSON.stringify(category));

      return res.json({
        source: "mongodb",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.updateCategory(id, req.body);

      await clearCache(id);

      res
        .status(200)
        .json({ message: "Category updated successful", data: category });
    } catch (error) {
      next(error);
    }
  }

  async findAllCategoryActive(req, res, next) {
    try {
      //check cache
      const cachedData = await redisClient.get(CACHE_KEY_ALL);
      if (cachedData) {
        return res.json({ source: "redis", data: JSON.parse(cachedData) });
      }

      //query db
      const categories = await CategoryService.findAllCategoryActive();

      //save cache

      await redisClient.setEx(
        CACHE_KEY_ALL,
        CACHE_TTL,
        JSON.stringify(categories)
      );

      return res.json({
        source: "mongodb",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async activateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.activateCategory(id);

      await clearCache(id);

      res
        .status(200)
        .json({ message: "Category unlocked successful", data: category });
    } catch (error) {
      next(error);
    }
  }

  async deactivateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.deactivateCategory(id);

      await clearCache(id);

      res
        .status(200)
        .json({ message: "Category locked successful", data: category });
    } catch (error) {
      next(error);
    }
  }

  async restoreCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.restoreCategory(id);

      await clearCache(id);

      res
        .status(200)
        .json({ message: "Category restore successful", data: category });
    } catch (error) {
      next(error);
    }
  }

  async softDeleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.softDeleteCategory(id);

      await clearCache();

      res
        .status(200)
        .json({ message: "Category deleted successful", data: category });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();

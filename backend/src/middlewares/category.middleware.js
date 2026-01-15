const { body, validationResult } = require("express-validator");

/* ========= COMMON HANDLER ========= */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/* ========= CREATE CATEGORY ========= */
const validateCreateCategory = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters")
    .trim(),

  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must be lowercase, numbers and hyphen only")
    .trim(),

  handleValidation,
];

/* ========= UPDATE CATEGORY ========= */
const validateUpdateCategory = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters")
    .trim(),

  body("slug")
    .optional()
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must be lowercase, numbers and hyphen only")
    .trim(),

  handleValidation,
];

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
};

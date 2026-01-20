const { body, validationResult } = require("express-validator");

/* ========= COMMON HANDLER ========= */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

/* ========= CREATE PRODUCT ========= */
const validateCreateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters")
    .trim(),

  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must be lowercase, numbers and hyphen only")
    .trim(),

  body("type")
    .notEmpty()
    .withMessage("Product type is required")
    .isIn(["product", "component"])
    .withMessage("Type must be either 'product' or 'component'"),

  body("componentType")
    .if(body("type").equals("component"))
    .notEmpty()
    .withMessage("componentType is required when type is component")
    .trim(),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Category ID must be a valid Mongo ID"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price must be greater than or equal to 0"),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array"),

  body("attributes.*.k")
    .optional()
    .notEmpty()
    .withMessage("Attribute key (k) is required"),

  body("attributes.*.v")
    .optional()
    .notEmpty()
    .withMessage("Attribute value (v) is required"),

  body("attributes.*.u")
    .optional()
    .isString()
    .withMessage("Attribute unit (u) must be a string"),

  handleValidation,
];

/* ========= UPDATE PRODUCT ========= */
const validateUpdateProduct = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters")
    .trim(),

  body("slug")
    .optional()
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must be lowercase, numbers and hyphen only")
    .trim(),

  body("type")
    .optional()
    .isIn(["product", "component"])
    .withMessage("Type must be either 'product' or 'component'"),

  body("componentType").optional().trim(),

  body("categoryId")
    .optional()
    .isMongoId()
    .withMessage("Category ID must be a valid Mongo ID"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price must be greater than or equal to 0"),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array"),

  handleValidation,
];

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};

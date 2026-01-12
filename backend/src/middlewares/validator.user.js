const { body, validationResult } = require("express-validator");

const validateCreateUser = [
  body("fullName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),

  body("phone")
    .optional()
    .matches(/^\d{10,12}$/)
    .withMessage("Phone must be 10-12 digits"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("roles")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Roles must be 'user' or 'admin'"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdateUser = [
  body("fullName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email").optional().isEmail().withMessage("Email is invalid"),

  body("phone")
    .optional()
    .matches(/^\d{10,12}$/)
    .withMessage("Phone must be 10-12 digits"),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("roles")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Roles must be 'user' or 'admin'"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


module.exports = { validateCreateUser, validateUpdateUser };

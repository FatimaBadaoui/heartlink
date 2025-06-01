import { body, validationResult } from "express-validator";

const userValidationRules = () => {
  return [
    body("username")
      .exists()
      .withMessage("Username is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters long")
      .notEmpty()
      .withMessage("Username cannot be empty")
      .isString()
      .withMessage("Username must be a string")
      .escape()
      .trim()
      .toLowerCase(),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 6, max: 15 })
      .withMessage("Password must be between 6 and 15 characters long")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isString()
      .withMessage("Password must be a string")
      .escape()
      .trim()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    body("firstName")
      .exists()
      .withMessage("First name is required")
      .notEmpty()
      .withMessage("First name cannot be empty")
      .isString()
      .withMessage("First name must be a string")
      .escape()
      .trim(),
    body("lastName")
      .exists()
      .withMessage("Last name is required")
      .notEmpty()
      .withMessage("Last name cannot be empty")
      .isString()
      .withMessage("Last name must be a string")
      .escape()
      .trim(),
    body("avatar").optional().trim().escape(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = [];
  errors.errors.map((err) => errorMessages.push({ [err.path]: err.msg }));
  return res.status(400).json({
    status: "error",
    message: "Validation failed",
    errors: errorMessages,
  });
};

export { userValidationRules, validate };

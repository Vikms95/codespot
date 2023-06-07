/* eslint-disable no-unused-expressions */
import { body } from "express-validator";

const validateUserCreation = [
  body("username")
    .exists()
    .withMessage("Username is required.")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 1 })
    .withMessage("Username must be at least 1 character.")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must contain alphanumeric characters only.")
    .escape(),

  body("password")
    .exists()
    .withMessage("Password is required.")
    .bail()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long.")
    .escape(),

  body("password2")
    .exists()
    .withMessage("Password confirmation is required.")
    .notEmpty()
    .withMessage("Password confirmation is required.")
    .isLength({ min: 5 })
    .withMessage("Password confirmation must be at least 5 characters long.")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password confirmation must match the password.")

    .escape(),
];

const validateUserLogin = [
  body("username")
    .exists()
    .withMessage("Username is required.")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 1 })
    .withMessage("Username must be at least 1 character.")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must contain alphanumeric characters only.")
    .escape(),

  body("password")
    .exists()
    .withMessage("Password is required.")
    .bail()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long.")
    .escape(),
];

export { validateUserCreation, validateUserLogin };

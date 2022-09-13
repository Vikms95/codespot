/* eslint-disable no-unused-expressions */
const { body } = require('express-validator')

const validateUserCreation = (req, res, next) => {
  body('username')
    .exists()
    .notEmpty()
    .isAlpha()
    .isLength({ min: 15 })
    .escape()

  body('password')
    .exists()
    .notEmpty()
    .trim()
    .isAlphanumeric()
    .isLength({ min: 5 })
    .escape()

  console.log('working')
  body('password2')
    .exists()
    .notEmpty()
    .trim()
    .isAlphanumeric()
    .isLength({ min: 5 })
    .escape()
  next()
}

module.exports = { validateUserCreation }

import { body } from "express-validator";

export const validateDeveloperInput = [
  body("name").trim().notEmpty().withMessage("Name is required."),
];

export const validateGenreInput = [
  body("name").trim().notEmpty().withMessage("Name is required."),
];

export const validateGamesInput = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("developer").trim().notEmpty().withMessage("Developer is required."),
  body("genre").trim().notEmpty().withMessage("Genre is required."),
  body("stock")
    .trim()
    .notEmpty()
    .withMessage("Stock is required.")
    .isNumeric()
    .withMessage("Stock must be a number.")
    .isLength({ min: 0 })
    .withMessage("Stock must be at least 0."),
];

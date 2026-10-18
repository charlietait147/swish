import { check } from 'express-validator';

export const contactValidation = [
    check('firstName')
        .trim()
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage('Please provide your first name'),
    check('lastName')
        .trim()
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage('Please provide your last name'),
    check('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('message')
        .trim()
        .notEmpty()
        .isLength({ max: 5000 })
        .withMessage('Please provide a message (up to 5000 characters)')
];

import { check } from 'express-validator';

export const userRegisterValidation = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('password')
        .exists()
        .isString()
        .matches(/?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)
        .withMessage('Password must be between 8 to 16 characters long and must contain at least one letter and one number')
]

export const updatePasswordValidation = [
    check('newPassword')
        .exists()
        .matches(/^\d{4,10}$/)
        .withMessage('New password must be between 4 and 10 digits')
];
import { check } from 'express-validator';

export const userRegisterValidation = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('password')
        .exists()
        .isString()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!.\d]{6,}$/)
        .withMessage('Password must be at least 6 characters long and must contain at least one letter and one number')
]

export const updatePasswordValidation = [
    check('newPassword')
        .exists()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)
        .withMessage('New password must be between 8 to 16 characters long and must contain at least one letter and one number')
];
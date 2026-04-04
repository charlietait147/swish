import { check } from 'express-validator';

export const userRegisterValidation = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('password')
        .exists()
        .isString()
        .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
        .withMessage('Password must be at least 8 characters long and must contain at least one letter and one number')
]

export const updatePasswordValidation = [
    check('newPassword')
        .exists()
        .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
        .withMessage('New password must be at least 8 characters and must contain at least one letter and one number')
];

export const resetPasswordValidation = [
    // check('token')
    //   .exists()
    //   .notEmpty()
    //   .withMessage('Reset token is required'),
    
    check('newPassword')
      .exists()
      .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
      .withMessage('New password must be at least 8 characters and must contain at least one letter and one number')
  ];
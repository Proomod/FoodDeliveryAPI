const {body, validationResult} = require('express-validator');

const userValidationRules = () => [
  body('userName').isEmail(),
  body('password').isLength({min: 6}),
];
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const errorList = [];
  errors.array().map((err) => errorList.push({[err.params]: err.msg}));
  return res.status(400).json({errors: errors});
};

module.exports = {
  userValidationRules,
  validate,
};

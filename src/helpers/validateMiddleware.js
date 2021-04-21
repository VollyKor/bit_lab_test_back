const Joi = require("joi").extend(require("@joi/date"));

const schemaData = Joi.object().keys({
  dateFrom: Joi.date().format("YYYY-MM-DD"),
  dateTo: Joi.date().format("YYYY-MM-DD"),
});

const schemaUser = Joi.object().keys({
  userId: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

const schemaPagination = Joi.object().keys({
  page: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
  limit: Joi.string()
    .length(2)
    .pattern(/^[0-9]+$/)
    .optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
  next();
};

module.exports.validateDate = (req, res, next) => {
  return validate(schemaData, req.query, next);
};
module.exports.validateUserId = (req, res, next) => {
  return validate(schemaUser, req.params, next);
};
module.exports.validatePagination = (req, res, next) => {
  return validate(schemaPagination, req.query, next);
};

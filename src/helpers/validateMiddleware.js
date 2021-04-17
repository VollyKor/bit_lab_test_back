const Joi = require("joi").extend(require("@joi/date"));
const schemaData = Joi.object().keys({
  dateFrom: Joi.date().format("YYYY-MM-DD"),
  dateTo: Joi.date().format("YYYY-MM-DD"),
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

module.exports.validate = (req, res, next) => {
  return validate(schemaData, req.query, next);
};

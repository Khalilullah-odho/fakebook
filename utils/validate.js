import Joi from "joi";

export const validateRegisterUser = ({ username, email, password }) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().alphanum().min(4).max(12).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  return schema.validate({ username, email, password });
};

export const validateLoginUser = ({ username, password }) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().alphanum().min(4).max(12).required(),
  });
  return schema.validate({ username, password });
};

export const validateBody = ({ body }) => {
  const schema = Joi.object({
    body: Joi.string().required().min(1).max(100),
  });
  return schema.validate({ body });
};

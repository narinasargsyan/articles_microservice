import { Joi } from "express-validation";

export const validationSchema = {
  config: {
    context: true,
    statusCode: 422,
    keyByField: true,
  },
  adminGetListSchema: {
    body: Joi.object({
      userId: Joi.number(),
      text: Joi.string(),
      id: Joi.number(),
    }),
  },
};

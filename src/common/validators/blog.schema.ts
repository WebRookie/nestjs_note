

const Joi = require('joi')

export const publishSchema = Joi.object({
  userId: Joi.number().required(),
  title: Joi.string().max(50).required(),
  content: Joi.string().max(500).required(),
  author: Joi.string().required(),
  label: Joi.string()
})
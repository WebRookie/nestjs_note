
const Joi = require('joi')

export const loginSchema = Joi.object({
  username: Joi.string().email({tlds: { allow: ['com', 'net']}}).required(),
  password: Joi.string().required(),
  timestamp: Joi.string().required()
})

export const registSchema = Joi.object({
  nickname: Joi.string().min(1).max(20).required(),
  password: Joi.string().min(4).required(),
  email: Joi.string().email({tlds: { allow: ['com', 'net']}}).required()
})
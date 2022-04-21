

const Joi = require('joi')

export const publishSchema = Joi.object({
  userId: Joi.number().required(),
  title: Joi.string().max(50).required(),
  content: Joi.string().max(500).required(),
  author: Joi.string().required(),
  label: Joi.string()
})


export const getAllBlogSchema = Joi.object({
  // pageSize: Joi.number().required(),
  pageNo: Joi.number().required(),
  userId: Joi.number().empty(null)
})

export const updateBlogInfo = Joi.object({
  blogId: Joi.number().required(),
  userId: Joi.number().required(),
  title: Joi.string().max(50).required(),
  content: Joi.string().max(500).required(),
  label: Joi.string()
})

export const comment = Joi.object({
  blogId: Joi.number().required(),
  userId: Joi.number().required(),
  comment: Joi.string().required()
})
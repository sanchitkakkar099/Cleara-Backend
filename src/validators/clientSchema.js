const Joi = require("joi");


module.exports = {
    createEditCient: Joi.object({
        companyName: Joi.string().required(),
        inquiryName: Joi.string().required(),
        clintCode: Joi.string().required(),
        date: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string(),
        physical_address : Joi.object({
            street: Joi.string().required(),
            addressLine2: Joi.string().required(),
            zip: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
        }).required(),
        billing_address : Joi.object({
            street: Joi.string().required(),
            addressLine2: Joi.string().required(),
            zip: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
        }).required(),
    })
}
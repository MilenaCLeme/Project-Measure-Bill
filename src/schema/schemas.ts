import Joi, { ObjectSchema } from 'joi';

const base64ImageRegex = /^data:image\/(png|jpeg|jpg|gif|bmp);base64,/;
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const authUpload = Joi.object().keys({
  image: Joi.string().pattern(base64ImageRegex).required(),
  measure_datetime: Joi.date().required(),
  measure_type: Joi.string().valid('WATER', 'GAS').required(),
  customer_code: Joi.string().pattern(uuidRegex).required()
});

const authConfirm = Joi.object().keys({
  measure_uuid: Joi.string().pattern(uuidRegex).required(),
  confirmed_value: Joi.number().required(),
});

export default {
  "/auth/upload": authUpload,
  "/auth/confirm": authConfirm,
} as { [key: string]: ObjectSchema }
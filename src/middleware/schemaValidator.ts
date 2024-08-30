import { RequestHandler, Request, Response, NextFunction  } from "express";
import schemas from "../schema/schemas";
import { ObjectSchema } from "joi";

const supportedMethods = ["post", "put", "patch", "delete"];

interface CustomError {
  error_code: string;
  error_description: string;
}

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (path: string): RequestHandler => {
  const schema = schemas[path];

  if (!schema) {
    throw new Error(`Schema not found for path: ${path}`);
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.validate(req.body, validationOptions); 
  
    if (error) {
      const customError: CustomError = {
        error_code: "INVALID_DATA",
        error_description: 'Os dados fornecidos no corpo da requisição são inválidos'
      };

      return res.status(400).json(customError);
    }

    req.body = value;
    return next();
  }
}

export default schemaValidator;

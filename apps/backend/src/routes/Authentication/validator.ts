import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import Joi = require("joi");

export const loginPostSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export interface LoginPostSchema {
    email: string;
    password: string;
}

export interface LoginRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: LoginPostSchema;
}

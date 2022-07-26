import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import Joi = require("joi");

export const loginPostSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const registerPostSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
});

export interface LoginPostSchema {
    email: string;
    password: string;
}
export interface RegisterPostSchema {
    email: string;
    password: string;
    name: string;
}

export interface RequestBodySchema<T> extends ValidatedRequestSchema {
    [ContainerTypes.Body]: T;
}

export interface RequestParamScheme<T> extends ValidatedRequestSchema {
    [ContainerTypes.Params]: T;
}

export interface RequestQuerySchema<T> extends ValidatedRequestSchema {
    [ContainerTypes.Query]: T;
}

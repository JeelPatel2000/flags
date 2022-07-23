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

export interface RequestSchema<T> extends ValidatedRequestSchema {
    [ContainerTypes.Body]: T;
}

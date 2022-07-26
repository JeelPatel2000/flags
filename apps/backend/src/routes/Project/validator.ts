import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import Joi = require("joi");

export const projectPostSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    userId: Joi.string().required(),
});

export interface ProjectPostSchema {
    name: string;
    description: string;
    userId: string;
}

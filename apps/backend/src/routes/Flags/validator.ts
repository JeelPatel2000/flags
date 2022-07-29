import Joi = require("joi");

export const flagsPostSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    projectId: Joi.string().required(),
    state: Joi.boolean().required(),
});

export interface FlagsPostSchema {
    name: string;
    description: string;
    projectId: string;
    state: boolean;
}

export const flagsPatchSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    state: Joi.boolean().optional(),
});

export interface FlagsPatchSchema {
    name?: string;
    description?: string;
    state?: boolean;
}

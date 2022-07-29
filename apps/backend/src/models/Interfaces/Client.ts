import { Response } from "express";

export interface Client {
    clientId: string;
    projectId: string;
    response: Response;
}

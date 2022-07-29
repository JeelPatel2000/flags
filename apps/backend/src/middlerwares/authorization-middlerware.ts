import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedUser {
    userId: string;
    email: string;
    name: string;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            return res.status(401).send("Access denied. No token provided.");

        const decoded = jwt.verify(
            token.split(" ")[1],
            req.config.jwtPrivateKey
        );
        req.user = decoded as unknown as AuthenticatedUser;

        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
};

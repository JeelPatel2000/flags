import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
};

export default authMiddleware;

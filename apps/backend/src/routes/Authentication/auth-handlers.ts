import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    res.send("hello");
};

export const register = async (req: Request, res: Response) => {
    res.send("register");
};

export const logout = async (req: Request, res: Response) => {
    res.send("register");
};

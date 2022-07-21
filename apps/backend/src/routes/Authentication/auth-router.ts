import { Router } from "express";
import { login, logout, register } from "./auth-handlers";

export function authRouter() {
    const router: Router = Router();

    router.post("/login", login);

    router.post("/register", register);

    router.post("/logout", logout);

    return router;
}

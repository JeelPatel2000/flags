import { Router, Response } from "express";
import { createValidator, ValidatedRequest } from "express-joi-validation";
import { IUserRepository } from "../../repository/interfaces/IUserRepository";
import { logout } from "./auth-handlers";
import {
    loginPostSchema,
    RequestSchema,
    RegisterPostSchema,
    registerPostSchema,
} from "./validator";
import * as jwt from "jsonwebtoken";
import { AuthConfig } from "../../config";
import * as bcrypt from "bcrypt";

export function authRouter(userRepository: IUserRepository) {
    const router: Router = Router();
    const validator = createValidator();

    router.post(
        "/login",
        validator.body(loginPostSchema),
        async (
            req: ValidatedRequest<RequestSchema<RegisterPostSchema>>,
            res: Response
        ) => {
            try {
                const { email, password } = req.body;
                const config = req.config as AuthConfig;

                const user = await userRepository.findOneByEmail(email);

                if (!user)
                    return res
                        .status(404)
                        .send("User not found. Invalid email or password.");

                const validPassword = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!validPassword)
                    return res.status(400).send("Invalid email or password.");

                const token = jwt.sign(
                    { userId: user.id, email: user.email, name: user.name },
                    config.jwtPrivateKey
                );

                res.send(token);
            } catch (error) {
                console.log(error);
                res.status(400);
            }
        }
    );

    router.post(
        "/register",
        validator.body(registerPostSchema),
        async (
            req: ValidatedRequest<RequestSchema<RegisterPostSchema>>,
            res: Response
        ) => {
            try {
                const { email, password, name } = req.body;
                const config = req.config as AuthConfig;

                const existingUser = await userRepository.findOneByEmail(email);

                if (existingUser !== undefined) {
                    return res
                        .status(400)
                        .send({ error: "Users already exist" });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const userId = await userRepository.create({
                    email: email,
                    password: hashedPassword,
                    name: name,
                });

                const token = jwt.sign(
                    { userId: userId, email: email, name: name },
                    config.jwtPrivateKey
                );
                res.send({ token });
            } catch (error) {
                console.log(error);
            }
        }
    );

    router.post("/logout", logout);

    return router;
}

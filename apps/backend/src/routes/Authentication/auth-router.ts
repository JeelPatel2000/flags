import { Router, Response } from "express";
import { createValidator, ValidatedRequest } from "express-joi-validation";
import { IUserRepository } from "../../repository/interfaces/IUserRepository";
import { logout, register } from "./auth-handlers";
import { loginPostSchema, LoginRequestSchema } from "./validator";

export function authRouter(userRepository: IUserRepository) {
    const router: Router = Router();
    const validator = createValidator();

    router.post(
        "/login",
        validator.body(loginPostSchema),
        async (req: ValidatedRequest<LoginRequestSchema>, res: Response) => {
            try {
                const { email, password } = req.body;

                const user = await userRepository.findOneByEmail(email);

                if (!user)
                    return res
                        .status(404)
                        .send("User not found. Invalid email or password.");

                // const validPassword = await bcrypt.compare(password, user.password);
                const validPassword = password == user.password;

                if (!validPassword)
                    return res.status(400).send("Invalid email or password.");

                const token = "343893889090";

                res.send(token);
            } catch (error) {
                console.log(error);
                res.status(400);
            }
        }
    );

    router.post("/register", register);

    router.post("/logout", logout);

    return router;
}

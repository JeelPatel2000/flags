import { Request, Response } from "express";
// export const login = async (
//     req: ValidatedRequest<LoginRequestSchema>,
//     res: Response,
//     userRepository: IUserRepository
// ) => {
//     const { email, password } = req.body;

//     // const user = await User.findOne({ email });
//     const user = false;

//     if (!user)
//         return res
//             .status(404)
//             .send("User not found. Invalid email or password.");

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword)
//         return res.status(400).send("Invalid email or password.");

//     const token = user.generateAuthToken();

//     res.send(token);
// };

export const register = async (req: Request, res: Response) => {
    res.send("register");
};

export const logout = async (req: Request, res: Response) => {
    res.send("register");
};

// const router = Router();

// router.get("/ping", async (_, res) => {
//   res.send("Connected to Server...");
// });

// router.post("/", async (req, res) => {
//   const { email, password } = req.body;
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findOne({ email });
//   if (!user)
//     return res.status(404).send("User not found. Invalid email or password.");

//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) return res.status(400).send("Invalid email or password.");

//   const token = user.generateAuthToken();

//   res.send(token);
// });

// router.post("/updateToken", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   const token = user.generateAuthToken();
//   res.send(token);
// });

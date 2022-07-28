import * as express from "express";
import { config } from "dotenv";
import { authRouter } from "./routes/Authentication/auth-router";
import { knex } from "knex";
import { getConfig } from "./config";
import { IUserRepository } from "./repository/interfaces/IUserRepository";
import { UserRepository } from "./repository/UserRepository";
import * as cors from "cors";
import { projectRouter } from "./routes/Project/project-router";
import { IProjectRepository } from "./repository/interfaces/IProjectRepository";
import { ProjectRepository } from "./repository/ProjectRepository";
import { flagsRouter } from "./routes/Flags/flags-router";
import { IFlagsRepository } from "./repository/interfaces/IFlagsRepository";
import { FlagsRepository } from "./repository/FlagsRepository";

config();

const appConfig = getConfig("prod");

const knexdb = knex({
    client: "mysql2",
    connection: {
        host: appConfig.host,
        port: 3306,
        user: appConfig.username,
        password: appConfig.password,
        database: appConfig.database,
        ssl: {
            rejectUnauthorized: false,
        },
    },
    migrations: {
        tableName: "migrations",
    },
});

const testConnection = knexdb.raw("SELECT 1+1");

console.log(testConnection);

const userRepository: IUserRepository = new UserRepository(knexdb, "users");
const projectRepository: IProjectRepository = new ProjectRepository(
    knexdb,
    "projects"
);
const flagsRepository: IFlagsRepository = new FlagsRepository(knexdb, "flags");

const app = express();

// Middlerwares
app.use(
    cors({
        origin: "*",
    })
);
app.use((req, _, next) => {
    req.config = appConfig;
    next();
});
app.use(express.json());

// Routes
app.use("/auth", authRouter(userRepository));
app.use("/projects", projectRouter(projectRepository));
app.use("/flags", flagsRouter(flagsRepository));

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => console.log(`Server stared on port ${PORT}`));

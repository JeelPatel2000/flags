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
import { Client } from "./models/Interfaces/Client";
import { EventEmitter } from "events";
import { authMiddleware } from "./middlerwares/authorization-middlerware";
import { flagsSubsribeRouter } from "./routes/Flags/flags-subscribe-router";

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

const userRepository: IUserRepository = new UserRepository(knexdb, "users");
const projectRepository: IProjectRepository = new ProjectRepository(
    knexdb,
    "projects"
);
const flagsRepository: IFlagsRepository = new FlagsRepository(knexdb, "flags");

const app = express();

const clients = new Array<Client>();
const eventEmitter = new EventEmitter();

eventEmitter.on("flagsUpdated", (data: { projectId: string }) => {
    console.log("flagsUpdated event");
    clients.forEach((client) => {
        console.log(client.clientId);
        if (client.projectId == data.projectId)
            client.response.write("data: New Updates\n\n", (err) => {
                if (err) console.log(`Error ${err}`);
            });
    });
});

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
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", authRouter(userRepository));
app.use("/projects", authMiddleware, projectRouter(projectRepository));
app.use("/flags", authMiddleware, flagsRouter(flagsRepository, eventEmitter));
app.use("/sse", flagsSubsribeRouter(clients));

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => console.log(`Server stared on port ${PORT}`));

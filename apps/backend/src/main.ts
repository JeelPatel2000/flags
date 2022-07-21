import * as express from "express";
import { config } from "dotenv";
import { authRouter } from "./routes/Authentication/auth-router";
import { knex } from "knex";
import { getConfig } from "./config";

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
    },
    migrations: {
        tableName: "migrations",
    },
});

const testConnection = knexdb.raw("SELECT 1+1");

console.log(testConnection);

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4300;

app.listen(PORT, () => console.log(`Server stared on port ${PORT}`));

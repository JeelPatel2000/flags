export type GlobalConfig = DbConfig;

export type DbConfig = {
    host: string;
    username: string;
    password: string;
    database: string;
};

export type Environment = "prod" | "dev";

export const getConfig = (environment: Environment): GlobalConfig => {
    let dbConfig: DbConfig;

    if (environment === "prod") {
        dbConfig = {
            database: process.env.DATABASE || "",
            host: process.env.HOST || "",
            password: process.env.PASSWORD || "",
            username: process.env.USERNAME || "",
        };
    } else {
        dbConfig = {
            database: "flags",
            host: "localhost",
            password: "",
            username: "root",
        };
    }

    return dbConfig;
};

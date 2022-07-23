export type GlobalConfig = DbConfig & AuthConfig;

export type DbConfig = {
    host: string;
    username: string;
    password: string;
    database: string;
};

export type AuthConfig = {
    jwtPrivateKey: string;
};

export type Environment = "prod" | "dev";

export const getConfig = (environment: Environment): GlobalConfig => {
    let dbConfig: DbConfig;
    let authConfig: AuthConfig;

    if (environment === "prod") {
        dbConfig = {
            database: process.env.DATABASE || "",
            host: process.env.HOST || "",
            password: process.env.PASSWORD || "",
            username: process.env.USERNAME || "",
        };
        authConfig = {
            jwtPrivateKey: "yrbfsdafgreyrwereyryhiuschvshk",
        };
    } else {
        dbConfig = {
            database: "flags",
            host: "localhost",
            password: "Test123#",
            username: "root",
        };
        authConfig = {
            jwtPrivateKey: "yrbfsdafgreyrwereyryhiuschvshk",
        };
    }

    return { ...dbConfig, ...authConfig };
};

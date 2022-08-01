export type GlobalConfig = DbConfig & AuthConfig;

export type DbConfig = {
    host: string;
    username: string;
    password: string;
    database: string;
    connectionString?: string;
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
            connectionString:
                'mysql://z9waa3vti0qy:pscale_pw_0A2yrwjXU573rtHonqKhO01n0819Bnq2WijRMHZK620@tg0rp2bwcatb.aws-ap-southeast-2-1.psdb.cloud/flags?ssl={"rejectUnauthorized":true}',
        };
        authConfig = {
            jwtPrivateKey: "2984uiojrklewjrw9e8hiun3jk89h",
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

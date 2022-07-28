import type { Knex } from "knex";

// Update with your config settings.
const HOST = "tg0rp2bwcatb.aws-ap-southeast-2-1.psdb.cloud";
const USERNAME = "z9waa3vti0qy";
const PASSWORD = "pscale_pw_0A2yrwjXU573rtHonqKhO01n0819Bnq2WijRMHZK620";
const DATABASE = "flags";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mysql2",
        connection: {
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Test123#",
            database: "flags",
            connectTimeout: 6000,
        },
    },
    production: {
        client: "mysql2",
        connection: {
            database: DATABASE,
            user: USERNAME,
            password: PASSWORD,
            host: HOST,
            ssl: {
                rejectUnauthorized: false,
            },
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};

module.exports = config;

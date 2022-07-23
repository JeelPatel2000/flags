import { JwtPayload } from "jsonwebtoken";
import { Knex } from "knex";
import { GlobalConfig } from "../config";

export declare type withAuthFunctions = {
    db: Knex;
};

export declare type withAuthenticatedUser = {
    user?: string | JwtPayload;
};

export declare type Config = {
    config: GlobalConfig;
};

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Application extends withAuthFunctions {}
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Request extends withAuthenticatedUser, Config {}
    }
}

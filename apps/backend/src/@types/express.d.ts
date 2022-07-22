import { JwtPayload } from "jsonwebtoken";
import { Knex } from "knex";

export declare type withAuthFunctions = {
    db: Knex;
};

export declare type withAuthenticatedUser = {
    user?: string | JwtPayload;
};

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Application extends withAuthFunctions {}
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Request extends withAuthenticatedUser {}
    }
}

import { Knex } from "knex";

export declare type withAuthFunctions = {
    db: Knex;
};

export declare type withAuthenticatedUser = {
    user?: Record<string, any>;
};

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Application extends withAuthFunctions {}
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Request extends withAuthenticatedUser {}
    }
}

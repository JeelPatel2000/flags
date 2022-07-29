import { IBaseRepository } from "./IBaseRepository";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface IUserRepository extends IBaseRepository<User> {
    findOneByEmail(email: string): Promise<User>;
    createWithUUID(item: User): Promise<User>;
}

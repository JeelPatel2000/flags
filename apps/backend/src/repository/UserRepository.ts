import { BaseRepository } from "./BaseRepository";
import { User, IUserRepository } from "./interfaces/IUserRepository";

export class UserRepository
    extends BaseRepository<User>
    implements IUserRepository
{
    findOneByEmail(email: string): Promise<User> {
        try {
            return this.queryBuilder
                .where({
                    email: email,
                })
                .first();
        } catch (error) {
            console.log(error);
        }
    }
}

import { Knex } from "knex";
import { BaseRepository } from "./BaseRepository";
import { IFlagsRepository, Flag } from "./interfaces/IFlagsRepository";

export class FlagsRepository
    extends BaseRepository<Flag>
    implements IFlagsRepository
{
    constructor(public readonly knex: Knex, public readonly tableName: string) {
        super(knex, tableName);
    }
    async createWithUUID(item: Flag): Promise<Flag> {
        const [output] = await this.queryBuilder
            .insert<Flag>(item)
            .returning("id");

        return output as Promise<Flag>;
    }
    deleteFlag(projectId: string, flagId: string): Promise<boolean> {
        const deleted = this.queryBuilder
            .delete("*")
            .from("flags")
            .where({ projectId: projectId, id: flagId });

        return deleted as unknown as Promise<boolean>;
    }

    getAllFlagsForAProject(projectId: string): Promise<Flag[]> {
        const flags = this.queryBuilder
            .select("*")
            .from("flags")
            .where({ projectId: projectId });
        return flags as Promise<Flag[]>;
    }

    // deleteProject(projectId: string, flagId: string): Promise<boolean> {
    //     const deleted = this.queryBuilder
    //         .delete("*")
    //         .from("flags")
    //         .where({ projectId: projectId, flagId: flagId });

    //     return deleted as unknown as Promise<boolean>;
    // }
}

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

    getAllFlagsForAProject(projectId: string): Promise<Flag[]> {
        const flags = this.queryBuilder
            .select("*")
            .from("Flags")
            .where({ projectId: projectId });
        return flags as Promise<Flag[]>;
    }

    deleteProject(projectId: string, flagId: string): Promise<boolean> {
        const deleted = this.queryBuilder
            .delete("*")
            .from("Flags")
            .where({ projectId: projectId, flagId: flagId });

        return deleted as unknown as Promise<boolean>;
    }
}

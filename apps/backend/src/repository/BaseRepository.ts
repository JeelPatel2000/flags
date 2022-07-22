import { Knex } from "knex";
import { IBaseRepository } from "./interfaces/IBaseRepository";

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(
        public readonly knex: Knex,
        public readonly tableName: string
    ) {}

    public get queryBuilder(): Knex.QueryBuilder {
        return this.knex(this.tableName);
    }

    async create(item: Omit<T, "id">): Promise<T> {
        const [output] = await this.queryBuilder.insert<T>(item).returning("*");

        return output as Promise<T>;
    }
    createMany(items: T[]): Promise<T[]> {
        return this.queryBuilder.insert<T>(items) as Promise<T[]>;
    }

    update(id: string, item: Partial<T>): Promise<boolean> {
        return this.queryBuilder.where("id", id).update(item);
    }

    delete(id: string): Promise<boolean> {
        return this.queryBuilder.where("id", id).del();
    }

    find(item: Partial<T>): Promise<T[]> {
        return this.queryBuilder.where(item).select();
    }

    findOne(id: string | Partial<T>): Promise<T> {
        return typeof id === "string"
            ? this.queryBuilder.where("id", id).first()
            : this.queryBuilder.where(id).first();
    }

    async exist(id: string | Partial<T>) {
        const query = this.queryBuilder.select<[{ count: number }]>(
            this.knex.raw("COUNT(*)::integer as count")
        );

        if (typeof id !== "string") {
            query.where(id);
        } else {
            query.where("id", id);
        }

        const exist = await query.first();

        return exist?.count !== 0;
    }
}

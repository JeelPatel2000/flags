import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("flags", (t) => {
        t.uuid("id").primary();
        t.string("name").primary().notNullable().unique();
        t.string("description").notNullable();
        t.boolean("state").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("flags");
}

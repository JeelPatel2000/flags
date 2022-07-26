import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("projects", (t) => {
        t.increments("id").primary();
        t.string("name", 100);
        t.string("description", 100);
        t.string("userId");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

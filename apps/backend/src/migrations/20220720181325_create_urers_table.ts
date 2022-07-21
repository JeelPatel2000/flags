import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (t) => {
        t.increments("id").primary();
        t.string("name", 100);
        t.string("email", 100);
        t.string("password", 512);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

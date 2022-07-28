import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("flags", function (t) {
        t.string("projectId").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("flags");
}

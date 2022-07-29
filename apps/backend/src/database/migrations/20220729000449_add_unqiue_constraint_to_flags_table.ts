import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("flags", function (t) {
        t.unique(["name", "projectId"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("flags");
}

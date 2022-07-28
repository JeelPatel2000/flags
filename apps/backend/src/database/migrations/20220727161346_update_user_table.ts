import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", function (t) {
        t.dropNullable("email");
        t.unique(["email"]);
        t.dropNullable("name");
        t.dropNullable("password");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

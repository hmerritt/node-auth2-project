exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments();
        table.text("username").unique().notNullable();
        table.text("password").unique().notNullable();
        table.text("department").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};

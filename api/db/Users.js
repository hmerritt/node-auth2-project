const db = require("./dbConnect");

function getAll(table) {
    return db(table);
}

function findBy(col, value) {
    return db("users").where(value, col);
}

function findById(id) {
    return db("users")
        .where(id, "id")
        .select("id", "username", "password")
        .first();
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return id;
}

module.exports = { getAll, findBy, findById, add };

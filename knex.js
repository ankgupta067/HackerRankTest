var Knex =  require("knex");

const config = require("./knex-config").sqlite;

module.exports.knex = Knex(config);

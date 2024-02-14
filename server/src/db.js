// database connection
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: 'localhost',
    database:"login_system",
    password: "password",
    port: 2468,
});

module.exports = pool;
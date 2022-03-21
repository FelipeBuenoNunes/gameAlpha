const { Pool } = require('pg');

const pool =  new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'game',
    password: 'felipe693402',
    port: "5432"
});

module.exports = pool;
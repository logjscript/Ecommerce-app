const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'logandietel',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'ecommerce_site'
})

module.exports = pool;
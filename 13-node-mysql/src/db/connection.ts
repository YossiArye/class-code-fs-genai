import mysql from 'mysql2/promise';

export default mysql.createPool({
    host: process.env.MYSQL_HOSTNAME,
    user:process.env.MYSQL_USERNAME,
    database:process.env.MYSQL_DB_NAME,
    password: process.env.MYSQL_PASSWORD
})
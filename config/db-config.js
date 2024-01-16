// importação do modulo do Mysql
import mysql from 'mysql2';

//configuração do banco de dados atraves da ciração do modulo db
const db = mysql.createConnection({
    host:'localhost',
    user:'admin',
    password:'admin',
    database:'taskdb'
});

export default db
const mysql = require("mysql2");

async function makeConnection({ host, user, database, password }) {
  try {
    const connection = mysql.createConnection({
      host,
      user,
      database,
      password,
    });

    return connection;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = makeConnection;

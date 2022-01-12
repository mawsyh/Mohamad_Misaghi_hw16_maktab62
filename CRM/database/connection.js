const mysql = require("mysql2/promise");

async function makeConnection({host, user, database, password}) {
  try {
    const connection = await mysql.createConnection({
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

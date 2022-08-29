const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");

const conn = newConnection();

conn.connect();

createSchema(conn);
insertPerson(conn);

conn.end();

app.get("/", async (req, res) => {
  const conn = newConnection();
  conn.connect();

  const people = await getPeopleFromDb(conn);

  res.send(
    "<h1>Full Cycle</h1>" +
      "<p>Lista de nomes cadastrada no banco de dados:</p>" +
      "<ul>" +
      people.map((p) => `<li>${p}</li>`).join("") +
      "</ul>"
  );
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});

function insertPerson(conn) {
  const sql = "INSERT INTO people(name) values('Dzerjinski')";
  conn.query(sql);
}

function createSchema(conn) {
  const sql = "CREATE TABLE IF NOT EXISTS people (name VARCHAR(255))";
  conn.query(sql);
}

function getPeopleFromDb(conn) {
  return new Promise((resolve, reject) => {
    conn.query("SELECT name FROM people", function (error, results, fields) {
      if (error) {
        return reject(error);
      }

      resolve(results.map((r) => r.name));
    });
  });
}

function newConnection() {
  return mysql.createConnection(config);
}

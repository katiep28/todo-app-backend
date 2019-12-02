const express = require("express"); //identifies the code that should be run
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const uuid = require("uuid/v4");

const app = express();

app.use(cors());
//Allows express to use jason data sent that is sent on the body of any requests
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "todo_list"
});


app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM task", function (err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        tasks: data
      });
    }
  });
});

app.delete("/tasks/:taskId", function (request, response) {
  // delete the task with the id passed
  const id = request.params.taskId;
  // response.status(200).send("Received a request to delete task ID " + id);

  connection.query("DELETE FROM task WHERE id = ? ", [id], function (err, data) {
    if (err) {
      console.log("Error deleteing tasks", err);
      response.status(500).json({
        error: err
      });
    } else {

      response.status(200).send("Received a request to delete task ID " + id);
    };
  });

});

app.post("/tasks", function (request, response) {
  // Crete a new task here
  // const idValue = request.body.id;
  // const textValue = request.body.text;
  // const statusValue = request.body.status;
  // const dateValue = request.body.date;
  // const usernameValue = request.body.username;
  const values = request.body;

  connection.query("INSERT INTO task (id, text, status, date, username) VALUES (?, ?, ?, ?, ?)",
    [uuid(), values.text, values.status, values.date, values.username],
    //  [idValue, textValue, statusValue, dateValue, usernameValue], 
    function (err, data) {
      if (err) {
        console.log("Error Inserting tasks", err);
        response.status(500).json({
          error: err
        });
      } else {
        response.status(201).send("Received a request to insert data ");
      };
    });
});

app.put("/tasks/:taskId", function (request, response) {
  // Update task here
  const id = request.params.taskId;

  // const status = request.params.taskStatus;
  // response.status(200).send("Task updated " + task.text);
  // response.status(200).send("Received a request to delete task ID " + id);

  connection.query("UPDATE task SET status = ? WHERE id = ? ", ["C",id], function (err, data) {
    if (err) {
      console.log("Error updateing task", err);
      response.status(500).json({
        error: err
      });
    } else {
      console.log("Update worked");
      response.status(200).send("Updated task ID " + id);
    };
  });

});


module.exports.tasks = serverless(app);
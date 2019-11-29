const express = require("express"); //identifies the code that should be run
const cors = require("cors");  
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

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


app.get("/tasks", function(request, response){
  connection.query("SELECT * FROM task", function(err, data) {
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

app.delete("/tasks/:taskId",function (request, response){
  // delete the task with the id passed
  const id = request.params.taskId;
  // response.status(200).send("Received a request to delete task ID " + id);

  connection.query("DELETE FROM task WHERE id = ? ", [id], function(err, data) {
    if (err) {
      console.log("Error deleteing tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      // console.log(sql); 
      // response.json({
      //   tasks: data    
    }
  });

});

app.post("/tasks",function (request, response){
  // Crete a new task here
  const task = request.body;
  response.status(201).send("Created a new task with text " + task.text);
});

app.put("/tasks/:taskId",function (request, response){
  // Update task here
  const id = request.params.taskId;
  const task = request.body;
  response.status(200).send("Task updated " + task.text);
});


module.exports.tasks = serverless(app);
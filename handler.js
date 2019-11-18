const express = require("express"); //identifies the code that should be run
const cors = require("cors");  
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
//Allows express to use jason data sent that is sent on the body of any requests
app.use(bodyParser.json());

app.get("/tasks", function(request, response){
  response.status(200).send({
    tasks: [
      {id: 1, text: "Clean the cat", completed: false, date: "2019-10-13"},
      {id: 2, text: "Wash the tree", completed: false, date: "2019-10-14"},
      {id: 3, text: "Eat Wine", completed: false, date: "2019-10-15"}
    ]
  });
});

app.delete("/tasks/:taskId",function (request, response){
  // delete the task with the id passed
  const id = request.params.taskId;
  response.status(200).send("Received a request to delete task ID " + id);
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
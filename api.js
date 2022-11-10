const express = require("express");
const app = express();
app.use(express.json());

let courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
  { id: 4, name: "course 4" },
  { id: 5, name: "course 5" },
];

//API

app.get("/", (req, res) => {
  if (req) console.log("Incoming Request...");
  res.send("Hello World!!");
});

//get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//get a course
app.get("/api/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);

  if (!course)
    res.status(404).send("The course with the given id was not found.");
  res.send(course);
});

//create a course
app.post("/api/courses/", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is required and should be minimum 3 characters");
    return;
  }
  console.log("Creating a new course...");
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//update a course
app.put("/api/courses/:id", (req, res) => {
  // lookup course with id
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);
  //if not exists, return 404
  if (!course) {
    res.status(404).send("The course with the given id was not found.");
    return;
  } else {
    console.log("Updating course...");
    course.name = req.body.name;
    res.send(course);
    console.log(`List of courses:`, courses);
  }
});

//delete a course
app.delete("/api/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);
  if (!course) {
    res.status(404).send("The course with the given id was not found.");
    return;
  } else {
    console.log("Deleting course...");
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
    console.log(`List of courses:`, courses);
  }
});

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const BookRouter = require("./routes/books.route");
const StudentRouter = require("../src/routes/students.route");
const WorkersRouter = require("../src/routes/workers.route");
const UsersRouter = require("../src/routes/users.route");

const app = express();

app.use(bodyParser.json());
app.use("/books", BookRouter);
app.use("/students", StudentRouter);
app.use("/workers", WorkersRouter);
app.use("/users", UsersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("App is running on port: " + PORT);
});

const express = require("express");
const bodyParser = require("body-parser");
const BookRouter = require("./routes/books.route");
const StudentRouter = require("../src/routes/students.route");

const app = express();

app.use(bodyParser.json());
app.use("/books", BookRouter);
app.use("/students", StudentRouter);

console.log("Hello world");

const PORT = 3000;
app.listen(PORT, () => {
  console.log("App is running on port: " + PORT);
});

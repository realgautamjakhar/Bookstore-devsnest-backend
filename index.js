const express = require("express");
const { connectDB } = require("./config/db");

const app = express();
const PORT = 1338;

//Middlewares

app.use(express.json()); //body parser

//routes
app.use("/api/v1/books", require("./routes/book"));

connectDB();
app.listen(PORT, () => {
  console.log("server is running");
});

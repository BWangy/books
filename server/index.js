require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const booksRouter = require("./routes/books");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "client")));

app.use("/api/books", booksRouter);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.error("Mongo Error:", err));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

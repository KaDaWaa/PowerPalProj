const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/user");
const postsRouter = require("./routes/post");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

module.exports = app;

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: `./.env` });

const transcript = require("./src/test");

const app = express();
app.use(cookieParser());

app.use(cors());

//body parser middleware
const { urlencoded } = require("express");
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/public", express.static("./public"));

app.get("/", (req, res) => {
  return res.render("index");
});

app.use("/api", transcript);

app.use("/*", (req, res) => {
  res
    .status(404)
    .send(
      `<br><br><h1 style="text-align: center;">404 || content not found</h1>`
    );
});

const PORT = process.env.PORT || 5510;

app.listen(PORT, () => {
  console.log(`server started ar PORT number ${PORT}`);
});

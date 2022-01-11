let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const makeConnection = require("./database/connection");

let projectRouter = require("./routes/project");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

makeConnection({
    host: "localhost",
    user: "root",
    database: "hw16",
    password: "1234"
}).then(function (conn) {
    app.use("/project", projectRouter({ connection: conn }));
    // global["connection"] = conn;
    // app.use("/project", projectRouter);
});

module.exports = app;

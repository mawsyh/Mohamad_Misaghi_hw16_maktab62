let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const makeConnection = require("./database/connection");
let managerRouter = require("./routes/manager");
let projectRouter = require("./routes/project");
let customerRouter = require("./routes/customer")
let ticketRouter = require("./routes/ticket")

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

makeConnection({
    host:"localhost", user:"root", database:"hw16", password:"1234"
}
).then(function (conn) {
    app.use("/manager", managerRouter({ connection: conn }));
    app.use("/project", projectRouter({ connection: conn }));
    app.use("/customer", customerRouter({ connection: conn }));
    app.use("/ticket", ticketRouter({ connection: conn }));
});

module.exports = app;

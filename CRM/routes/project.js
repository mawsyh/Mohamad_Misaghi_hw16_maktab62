let express = require("express");
let router = express.Router();


module.exports = function ({ connection }) {
  router.get("/", function (req, res) {
      connection.query(
          "SELECT * FROM `Project`",
          function (err, results, fields) {
              console.log(err);
              if (!!err) return res.status(500).send("Internal server error.");
              res.send({ results });
          }
      );
  });

  return router;
};

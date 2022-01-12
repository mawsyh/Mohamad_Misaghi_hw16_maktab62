let express = require("express");
let router = express.Router();


module.exports =  function ({ connection }) {
    router.get("/showAll", async function (req, res) {
        try{
            const [row, schema] = await connection.query("SELECT * FROM manager")
            console.table(row)
            res.send(row)
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    router.post("/search", async function (req, res) {
        try{
            const [row, schema] = await connection.query(`SELECT * FROM manager WHERE ${req.body.key} = ${req.body.value}`)
            console.table(row)
            res.send(row)
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    router.post("/delete", async function (req, res) {
        try{
            const deletingData = await connection.query(`DELETE FROM manager WHERE ${req.body.key} = ${req.body.value}`)
            console.table(deletingData[0])
            res.send(deletingData[0])
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    router.post("/update", async function (req, res) {
        try{
            const updatingResult = await connection.query(`UPDATE manager SET name = ?, phoneNumber = ?, nationalCode = ? WHERE id = ?`,
                [req.body.name, req.body.phoneNumber, req.body.nationalCode, req.body.id])
            console.table(updatingResult[0])
            res.send(updatingResult[0])
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    router.post("/create", async function (req, res) {
        try{
            const creatingResult = await connection.query(`INSERT INTO manager (id, name, phoneNumber, nationalCode) VALUES (?, ?, ? ,?)`,
                [req.body.id, req.body.name, req.body.phoneNumber, req.body.nationalCode])
            console.table(creatingResult[0])
            res.send(creatingResult[0])
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    return router;
};

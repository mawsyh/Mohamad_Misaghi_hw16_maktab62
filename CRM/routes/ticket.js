let express = require("express");
let router = express.Router();

module.exports =  function ({ connection }) {
    router.get("/showAll", async function (req, res) {
        try{
            const [row, schema] = await connection.query("SELECT t.*, pcm.managerId, pcm.customerId, pcm.projectId FROM ticket as t JOIN pcm ON pcm.id = t.pcmId")
            console.table(row)
            res.send(row)
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    router.post("/search", async function (req, res) {
        try{
            const [row, schema] = await connection.query(`SELECT * FROM ticket WHERE ${req.body.key} = ${req.body.value}`)
            console.table(row)
            res.send(row)
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    router.post("/delete", async function (req, res) {
        try{
            const deletingData = await connection.query(`DELETE FROM ticket WHERE ${req.body.key} = ${req.body.value}`)
            console.table(deletingData[0])
            res.send(deletingData[0])
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    router.post("/update", async function (req, res) {
        try{
            const updatingResult = await connection.query(`UPDATE ticket SET status = ?, title = ?, description = ?, closedAt = ?, createdAt = ?, solution = ?, pcmId = ? WHERE id = ?`,
                [req.body.status, req.body.title, req.body.description, req.body.closedAt, req.body.createdAt, req.body.solution, req.body.pcmId, req.body.id])
            console.table(updatingResult[0])
            res.send(updatingResult[0])
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    router.post("/create", async function (req, res) {
        try{
            const creatingResult = await connection.query(`INSERT INTO ticket (id, status, title, description, closedAt, createdAt, solution, pcmId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [req.body.id, req.body.status, req.body.title, req.body.description, req.body.closedAt, req.body.createdAt, req.body.solution, req.body.pcmId])
            console.table(creatingResult[0])
            res.send(creatingResult[0])
        } catch(err){
            console.error(err)
            res.status(500).send({'Internal Server Error': err.sqlMessage })
        }
    });
    return router;
};

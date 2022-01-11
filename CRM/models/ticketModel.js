const model = {}

module.exports = function(connection) {

    model.findAll = async function() {
        try {
            const [rows] = await connection.query(`
        SELECT
        t.*,
        pcm.managerId,
        pcm.customerId,
        pcm.projectId,
        m.id as messageId,
        m.body as message_body,
        m.sender as message_sender
        FROM ticket as t
        LEFT JOIN pcm
        ON pcm.id = t.pcmId
        LEFT JOIN message as m
        ON m.ticketId = t.id;
      `);

            const helper = [];
            for(const row of rows) {

                row['messages'] = [
                    { id: row.messageId, body: row.message_body, sender: row.message_sender }
                ];
                delete row.messageId;
                delete row.message_body;
                delete row.message_sender;

                const foundRow = helper.find(r => r.id === row.id);
                if(!foundRow) {
                    helper.push(row);
                }
                else {
                    foundRow.messages.push(row.messages[0]);
                }

            }

            return [ , helper ];
        } catch(err) {
            return [ err ];
        }
    }
    model.findById = async function(id) {
        try {
            const [ rows ] = await connection.query(`
          SELECT
          t.*,
          pcm.managerId,
          pcm.customerId,
          pcm.projectId,
          m.id as messageId,
          m.body as message_body,
          m.sender as message_sender
          FROM ticket as t
          JOIN pcm
          ON pcm.id = t.pcmId
          JOIN message as m
          ON m.ticketId = t.id
          WHERE t.id = ?;
        `,
                [id]
            );

            const helper = [];
            for(const row of rows) {

                row['messages'] = [
                    { id: row.messageId, body: row.message_body, sender: row.message_sender }
                ];
                delete row.messageId;
                delete row.message_body;
                delete row.message_sender;

                const foundRow = helper.find(r => r.id === row.id);
                if(!foundRow) {
                    helper.push(row);
                }
                else {
                    foundRow.messages.push(row.messages[0]);
                }

            }

            return [ , helper];

        } catch(err) {
            return [ err ];
        }
    }
    model.create = async function(data) {
        try {
            const [ row ] = await connection.query(
                `INSERT INTO ticket (status, title, description, createdAt, pcmId) VALUES (?, ?, ?, ?, ?)`,
                [ data.status, data.title, data.description, data.createdAt, data.pcmId ],
            );
            return [ , row ];
        } catch(err) {
            return [ err ];
        }
    }
    model.update = async function(id, data) {
        try {
            const [ row ] = await connection.query(
                `UPDATE ticket SET status = ?, title = ?, description = ?, solution = ?, pcmId = ? WHERE id = ?`,
                [ data.status, data.title, data.description, data.solution, data.pcmId, id ]
            );
            return [ , row ];
        } catch(err) {
            return [ err ];
        }
    }
    model.delete = async function(id) {
        try {
            const [ row ] = await connection.query(
                `DELETE FROM ticket WHERE id = ?`,
                [ id ]
            );
            return [ , row ];
        } catch(err) {
            return [ err ];
        }
    }

    return model
}
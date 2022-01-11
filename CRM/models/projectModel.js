const model = {}

module.exports = function(connection) {

    model.findAll = async function() {
        try {
            const [rows] = await connection.query(`
        SELECT p.*, pcm.managerId, pcm.customerId
        FROM project as p
        JOIN pcm
        ON pcm.project
        d = p.id
      `);

            const helper = [];
            for(const row of rows) {
                const foundRow = helper.find(r => r.id === row.id);
                if(!foundRow) {
                    helper.push(row);
                } else {

                    if(Array.isArray(foundRow.managerId)) {
                        if(!foundRow.managerId.includes(row.managerId)) {
                            foundRow.managerId.push(row.managerId);
                        }
                    } else {
                        foundRow.managerId = [row.managerId];
                    }

                    if(Array.isArray(foundRow.customerId)) {
                        if(!foundRow.customerId.includes(row.customerId)) {
                            foundRow.customerId.push(row.customerId);
                        }
                    } else {
                        foundRow.customerId = [row.customerId];
                    }
                }

            }

            return [ helper ];
        } catch(err) {
            return [ err ];
        }
    }
    model.findById = async function(id) {
        try {
            const [ row ] = await connection.query(`
        SELECT p.*, pcm.managerId, pcm.customerId
        FROM project as p
        JOIN pcm
        ON pcm.projectId = p.id
        WHERE p.id = ?
        `, [id]
            );

            const helper = row[0];

            for(const r of row) {
                if(Array.isArray(helper.managerId)) {
                    if(!helper.managerId.includes(r.managerId)) {
                        helper.managerId.push(r.managerId);
                    }
                } else {
                    helper.managerId = [r.managerId];
                }
                if(Array.isArray(helper.customerId)) {
                    if(!helper.customerId.includes(r.customerId)) {
                        helper.customerId.push(r.customerId);
                    }
                } else {
                    helper.customerId = [r.customerId]
                }
            }
            return [ , [helper]];

        } catch(err) {
            return [ err ];
        }
    }
    model.create = async function(data) {
        try {
            const [ row ] = await connection.query(
                `INSERT INTO project (title, description) VALUES (?, ?)`,
                [ data.title, data.description ],
            );
            return [ , row ];
        } catch(err) {
            return [ err ];
        }
    }
    model.update = async function(id, data) {
        try {
            const [ row ] = await connection.query(
                `UPDATE project SET title = ?, description = ? WHERE id = ?`,
                [ data.title, data.description, id ]
            );
            return [ , row ];
        } catch(err) {
            return [ err ];
        }
    }
    model.delete = async function(id) {
        try {
            const [ row ] = await connection.query(
                `DELETE FROM project WHERE id = ?`,
                [ id ]
            );
            return [ , row ];
        } catch(err) {
            return [ err ];
        }
    }

    return model
}
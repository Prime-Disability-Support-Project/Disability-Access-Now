const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// endpoint for uploading files
router.post('/upload', async (req, res) => {
    const { filename, data, article_id } = req.body;
    // converts a base64-encoded string into a binary buffer
    // buffer is used to manipulate blob data
    // data is the blob, 'base64' specifies the encoding of input
    // this prepares it so that it can be easily sent/retrieved from db
    const buffer = Buffer.from(data, 'base64');

    // method called to obtain a client which is a connection the database
    const client = await pool.connect();

    try {
        const sqlText = `
            INSERT INTO files (filename, data)
            VALUES ($1, $2)
            RETURNING id
            `
            const queryText = `
            INSERT INTO articles_files (article_id, file_id)
            VALUES ($1, $2)
            `

        // sends client query, and filename / buffer to db
        const result = await client.query(sqlText, [filename, buffer]);
        const fileId = result.rows[0].id;
        await client.query(queryText, [article_id, fileId]);
        res.status(200).send('File Upload Success!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Uploading File');
    }


    // release client from pool after either way
    client.release();
});


// endpoint for downloading files
router.get('/download/:id', async (req, res) => {
    const { id } = req.params;

    const client = await pool.connect();
    try {
        const sqlText = `SELECT filename, data FROM files WHERE id = $1`
    
        const result = await client.query(sqlText, [id]);
        if(result.rows.length > 0){
            const {filename, data} = result.rows[0];
            // if there is a file sent, set Headers, headers are used
            // to communicate with API client and server
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Type', 'application/pdf');
            res.send(data);
        } else {
            res.status(404).send('File Not Found!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Downloading File');
    }

    client.release();
});






module.exports = router;

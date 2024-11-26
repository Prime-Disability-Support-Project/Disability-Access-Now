const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// endpoint for uploading files
router.post('/upload', async (req, res) => {
    const { filename, data } = req.body;
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
            `;

        // sends client query, and filename / buffer to db
        const result = await client.query(sqlText, [filename, buffer]);
        res.status(200).send('File Upload Success!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Uploading File');
    } finally {
        client.release()
    }

});


// endpoint for downloading files
router.get('/download/:filename', async (req, res) => {
    const { filename } = req.params;

    const client = await pool.connect();
    try {
        const sqlText = `SELECT filename, data FROM files WHERE filename = $1`
    
        const result = await client.query(sqlText, [filename]);
        if(result.rows.length > 0){
            const { filename, data } = result.rows[0];
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
    } finally {
        client.release()
    }

});

router.get('/search', async (req, res) => {
    const { keyword } = req.query;
    console.log('Searching for Keyword', keyword)

    const client = await pool.connect();

    try {
        const result = await client.query(`SELECT id, filename FROM files WHERE filename ILIKE $1`, [`%${keyword}%`]);
        
        console.log(`Search Result Rows: ${JSON.stringify(result.rows)}`)
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

module.exports = router;

const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// endpoint for uploading files
router.post("/upload", async (req, res) => {
  const { filename, data } = req.body;
  // converts a base64-encoded string into a binary buffer
  // buffer is used to manipulate blob data
  // data is the blob, 'base64' specifies the encoding of input
  // this prepares it so that it can be easily sent/retrieved from db
  const buffer = Buffer.from(data, "base64");

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
    res.status(200).send("File Upload Success!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Uploading File");
  } finally {
    client.release();
  }
});

// endpoint for downloading files
router.get("/download/:filename", async (req, res) => {
  const { filename } = req.params;

  const client = await pool.connect();
  try {
    const sqlText = `SELECT filename, data FROM files WHERE filename = $1`;

    const result = await client.query(sqlText, [filename]);
    if (result.rows.length > 0) {
      const { filename, data } = result.rows[0];
      // if there is a file sent, set Headers, headers are used
      // to communicate with API client and server
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    } else {
      res.status(404).send("File Not Found!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Downloading File");
  } finally {
    client.release();
  }
});

router.get("/search", async (req, res) => {
  const { keyword } = req.query;
  console.log("Searching for Keyword", keyword);

  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT id, filename FROM files WHERE filename ILIKE $1`,
      [`%${keyword}%`]
    );

    console.log(`Search Result Rows: ${JSON.stringify(result.rows)}`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Get all files
router.get("/allFiles", (req, res) => {
  const queryText = 'SELECT * FROM files ORDER BY "filename" ASC;';
  pool
    .query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for all files:", error);
      res.sendStatus(500);
    });
});

// Get specific file
router.get("/allFiles/:id", (req, res) => {
  const queryText =
    'SELECT * FROM files WHERE "id" = $1 ORDER BY "filename" ASC;';
  const params = [req.params.id];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for specific file:", error);
      res.sendStatus(500);
    });
});

// Get all filenames associated with a specific article
router.get("/associatedFiles/:id", (req, res) => {
  const queryText = `
    SELECT 
    files.filename AS filename
    FROM 
    articles_files
    JOIN 
    files ON articles_files.file_id = files.id
    WHERE 
    articles_files.article_id = $1;
    `;

  const params = [req.params.id];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for associated files:", error);
      res.sendStatus(500);
    });
});

// Delete a specific file
router.delete("/:id", (req, res) => {
  const fileId = req.params.id;

  pool
    .query(`DELETE FROM "files" WHERE id = $1;`, [fileId])
    .then((result) => {
      res.status(200).send("File successfully deleted");
    })
    .catch((error) => {
      console.log("Error deleting:", error);
      res.sendStatus(500);
    });
});

module.exports = router;

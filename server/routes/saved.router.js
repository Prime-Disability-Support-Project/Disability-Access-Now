const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET all articles that are saved by a specific user
router.get("/articles", (req, res) => {
  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 2;
  const queryText = `
    SELECT articles.id, articles.title, articles.subtitle, articles.body, articles.article_url 
    FROM "savedArticle"
    JOIN articles
    ON articles.id = "savedArticle".article_id
    JOIN "user"
    ON "user".id = "savedArticle".user_id
    WHERE "user".id = $1;
    `;
  const params = [userId];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for saved article:", error);
      res.sendStatus(500);
    });
});

// GET all files that are saved by a specific user
router.get("/files", (req, res) => {
  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 2;
  const queryText = `
      SELECT files.id, files.filename, files.data
      FROM "savedFile"
      JOIN files
      ON files.id = "savedFile".file_id
      JOIN "user"
      ON "user".id = "savedFile".user_id
      WHERE "user".id = $1;
      `;
  const params = [userId];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for saved files:", error);
      res.sendStatus(500);
    });
});

// POST a new user+article relationship in the savedArticle table
router.post("/save-article", (req, res) => {
  const articleId = req.body.articleId;

  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 1;

  const insertQuery = `INSERT INTO "savedArticle" ("article_id", "user_id") 
        VALUES ($1, $2);`;
  const insertParams = [articleId, userId];

  pool
    .query(insertQuery, insertParams)

    .then((results) => res.sendStatus(201)) // Created
    .catch((error) => {
      console.log("Error making POST for new saved article:", error);
      res.sendStatus(500);
    });
});

// POST a new user+file relationship in the savedFile table
router.post("/save-file", (req, res) => {
  const fileId = req.body.fileId;

  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 1;

  const insertQuery = `INSERT INTO "savedFile" ("file_id", "user_id") 
          VALUES ($1, $2);`;
  const insertParams = [fileId, userId];

  pool
    .query(insertQuery, insertParams)

    .then((results) => res.sendStatus(201)) // Created
    .catch((error) => {
      console.log("Error making POST for new saved file:", error);
      res.sendStatus(500);
    });
});

// removing the article from saved articles
router.delete("/article/:id", (req, res) => {
  const articleId = req.params.id;

  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 1;
  pool
    .query(`DELETE FROM "savedArticle" WHERE article_id = $1 AND user_id= $2`, [
      articleId,
      userId,
    ])
    .then((result) => {
      res.status(200).send(" saved article removed ");
    })
    .catch((error) => {
      console.log("Error deleting:", error);
      res.sendStatus(500);
    });
});

// Removes the file from the savedFile table
router.delete("/file/:id", (req, res) => {
  const fileId = req.params.id;

  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 1;
  pool
    .query(`DELETE FROM "savedFile" WHERE file_id = $1 AND user_id= $2`, [
      fileId,
      userId,
    ])
    .then((result) => {
      res.status(200).send(" saved file removed ");
    })
    .catch((error) => {
      console.log("Error deleting:", error);
      res.sendStatus(500);
    });
});

module.exports = router;

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



  
/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;

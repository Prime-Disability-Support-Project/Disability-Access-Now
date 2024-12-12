const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET All Article Titles and URLs
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM articles ORDER BY "title" ASC`;

  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("Error fetching all articles:", error);
      res.sendStatus(500);
    });
});

// GET article with title ILIKE FAQ
router.get("/faq", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM articles WHERE "title" ILIKE $1`;
  const params = ["%FAQ%"];

  pool
    .query(queryText, params)
    .then((results) => {
      if (results.rows.length === 0) {
        res.status(404).send("Article Not Found");
      } else {
        res.send(results.rows[0]);
      }
    })
    .catch((error) => {
      console.log("Error fetching FAQ:", error);
      res.sendStatus(500);
    });
});

// GET article with title ILIKE Eligibility Criteria
router.get("/eligible", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM articles WHERE "title" ILIKE $1`;
  const params = ["%Eligibility Criteria%"];

  pool
    .query(queryText, params)
    .then((results) => {
      if (results.rows.length === 0) {
        res.status(404).send("Article Not Found");
      } else {
        res.send(results.rows[0]);
      }
    })
    .catch((error) => {
      console.log("Error fetching eligibility:", error);
      res.sendStatus(500);
    });
});

// GET article with title LIKE Forms You Should Start With
router.get("/forms", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM articles WHERE "title" ILIKE $1`;
  const params = ["%Forms You Should Start With%"];

  pool
    .query(queryText, params)
    .then((results) => {
      if (results.rows.length === 0) {
        res.status(404).send("Article Not Found");
      } else {
        res.send(results.rows[0]);
      }
    })
    .catch((error) => {
      console.log("Error fetching eligibility:", error);
      res.sendStatus(500);
    });
});

// GET Specific Article
router.get("/:articleId", rejectUnauthenticated, (req, res) => {
  const { articleId } = req.params;
  const queryText = `SELECT * FROM articles WHERE id = $1`;
  const params = [articleId];

  pool
    .query(queryText, params)
    .then((results) => {
      if (results.rows.length === 0) {
        res.status(404).send("Article Not Found");
      } else {
        res.send(results.rows[0]);
      }
    })
    .catch((error) => {
      console.log("Error fetching article by ID:", error);
      res.sendStatus(500);
    });
});

// POST New Article (Also Update Junction Table if Files are Provided)
router.post("/", rejectUnauthenticated, (req, res) => {
  const { title, body, fileIds } = req.body;
  const queryText = `
                                  INSERT INTO articles ("title", "body") 
                                  VALUES ($1, $2) 
                                  RETURNING id;
                                                `;
  const params = [title, body];

  pool
    .query(queryText, params)
    .then((result) => {
      const articleId = result.rows[0].id;

      // If there are files, insert into the junction table
      if (fileIds && fileIds.length > 0) {
        const fileQueries = fileIds.map((fileId) => {
          const insertFileQuery = `INSERT INTO articles_files (article_id, file_id) VALUES ($1, $2)`;
          const insertFileParams = [articleId, fileId];
          return pool.query(insertFileQuery, insertFileParams);
        });

        // Wait for all file insertions to finish before sending the response
        Promise.all(fileQueries)
          .then(() => {
            res.status(201).json({ articleId });
          })
          .catch((error) => {
            console.log("Error associating files with article:", error);
            res.sendStatus(500);
          });
      } else {
        res.status(201).json({ articleId });
      }
    })
    .catch((error) => {
      console.log("Error inserting new article:", error);
      res.sendStatus(500);
    });
});

// PUT Update an article's contents
router.put("/:articleId", rejectUnauthenticated, (req, res) => {
  const { articleId } = req.params;
  const { title, body } = req.body;
  const queryText = `UPDATE articles SET "title" = $1, "body" = $2 WHERE id = $3`;
  const params = [title, body, articleId];

  pool
    .query(queryText, params)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).send("Article Not Found");
      } else {
        res.status(200).send("Article updated");
      }
    })
    .catch((error) => {
      console.log("Error updating article:", error);
      res.sendStatus(500);
    });
});

// PUT Update an article's associated files list
router.put("/files/:articleId", rejectUnauthenticated, (req, res) => {
  const { articleId } = req.params;
  const { fileIds } = req.body;
  // First empty out any existing relationships with files
  const queryText = "DELETE FROM articles_files WHERE article_id = $1";
  pool.query(queryText, [articleId]);
  // Then insert new article - file relationships
  const fileQueries = fileIds.map((fileId) => {
    const insertFileQuery = `INSERT INTO articles_files (article_id, file_id) VALUES ($1, $2)`;
    const insertFileParams = [articleId, fileId];
    return pool.query(insertFileQuery, insertFileParams);
  });

  Promise.all(fileQueries)
    .then(() => {
      res.status(201).json({ articleId });
    })
    .catch((error) => {
      console.log("Error associating files with article:", error);
      res.sendStatus(500);
    });
});

// DELETE an Article
router.delete("/:articleId", rejectUnauthenticated, (req, res) => {
  const { articleId } = req.params;

  // First, delete the file associations
  pool
    .query(`DELETE FROM articles_files WHERE article_id = $1`, [articleId])
    .then(() => {
      // Then delete the article itself
      return pool.query(`DELETE FROM articles WHERE id = $1`, [articleId]);
    })
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).send("Article Not Found");
      } else {
        res.status(200).send("Article deleted");
      }
    })
    .catch((error) => {
      console.log("Error deleting article:", error);
      res.sendStatus(500);
    });
});

module.exports = router;

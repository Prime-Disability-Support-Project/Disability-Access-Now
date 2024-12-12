const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET text content and email for Pending Approval page
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "home"`;

  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("Error fetching Home content:", error);
      res.sendStatus(500);
    });
});

// PUT Home Content
router.put("/:id", (req, res) => {
  const { title, body, linkHeader } = req.body;
  const id = req.params.id;
  const queryText = `UPDATE "home" SET "title" = $1, "body" = $2, "linkHeader" = $3 WHERE "id" = $4`;
  const params = [title, body, linkHeader, id];

  pool
    .query(queryText, params)
    .then((result) => {
      res.status(200).send("Home updated");
    })
    .catch((error) => {
      console.log("Error updating Home:", error);
      res.sendStatus(500);
    });
});

module.exports = router;

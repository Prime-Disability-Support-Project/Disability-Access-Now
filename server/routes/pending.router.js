const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET text content and email for Pending Approval page
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "pending"`;

  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("Error fetching aboutUs content:", error);
      res.sendStatus(500);
    });
});

// PUT Pending Content
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const { body, email } = req.body;
  const id = req.params.id;
  const queryText = `UPDATE "pending" SET "body" = $1, "email" = $2 WHERE "id" = $3`;
  const params = [body, email, id];

  pool
    .query(queryText, params)
    .then((result) => {
      res.status(200).send("Pending updated");
    })
    .catch((error) => {
      console.log("Error updating Pending:", error);
      res.sendStatus(500);
    });
});

module.exports = router;

const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET text content and email for Pending Approval page
router.get("/", (req, res) => {
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
router.put("/:id", (req, res) => {
  const { body, email } = req.body;
  const id = req.params.id
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

// PUT a bio
router.put("/bios", (req, res) => {
  const { name, bio, link, type, bioId } = req.body;
  const queryText = `UPDATE "bios" SET "name" = $1, "bio" = $2, "link" = $3, "type" = $4 WHERE "id" = $5`;
  const params = [name, bio, link, type, bioId];

  pool
    .query(queryText, params)
    .then((result) => {
      res.status(200).send("Bio updated");
    })
    .catch((error) => {
      console.log("Error updating Bio:", error);
      res.sendStatus(500);
    });
});

// Delete a bio
router.delete("/:id", (req, res) => {
  const bioId = req.params.id;

  pool
    .query(`DELETE FROM "bios" WHERE id = $1`, [bioId])
    .then((result) => {
      res.status(200).send("Bio successfully deleted");
    })
    .catch((error) => {
      console.log("Error deleting Bio:", error);
      res.sendStatus(500);
    });
});

module.exports = router;

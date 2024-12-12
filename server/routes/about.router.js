const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET About Us text content
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "aboutUs"`;

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

// GET bios
router.get("/bios", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "bios" ORDER BY "name" ASC`;

  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("Error fetching bios:", error);
      res.sendStatus(500);
    });
});

// POST a new bio
router.post("/bio", rejectUnauthenticated, (req, res) => {
  const { name, bio, link, type } = req.body;
  const insertQuery = `INSERT INTO "bios" ("name", "bio", "link", "type") 
            VALUES ($1, $2, $3, $4);`;
  const insertParams = [name, bio, link, type];

  pool
    .query(insertQuery, insertParams)

    .then((results) => res.sendStatus(201))
    .catch((error) => {
      console.log("Error making POST for new bio:", error);
      res.sendStatus(500);
    });
});

// PUT AboutUs content
router.put("/", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const { title, founderText, devText, id } = req.body;
  const queryText = `UPDATE "aboutUs" SET "title" = $1, "founderText" = $2, "devText" = $3 WHERE "id" = $4`;
  const params = [title, founderText, devText, id];

  pool
    .query(queryText, params)
    .then((result) => {
      res.status(200).send("AboutUs updated");
    })
    .catch((error) => {
      console.log("Error updating AboutUs:", error);
      res.sendStatus(500);
    });
});

// PUT a bio
router.put("/bios/:id", rejectUnauthenticated, (req, res) => {
  const { name, bio, link, type } = req.body;
  const bioId = req.params.id;
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
router.delete("/:id", rejectUnauthenticated, (req, res) => {
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

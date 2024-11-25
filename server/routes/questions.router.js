const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Get all unanswered questions for the specific user - ordered by date
router.get("/user-unanswered-questions", (req, res) => {
  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 5;
  const queryText =
    'SELECT * FROM questions WHERE "user_id" = $1 AND "answered" = $2 ORDER BY "question_date" ASC;';
  const params = [userId, false];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for user unanswered questions:", error);
      res.sendStatus(500);
    });
});

// Get all answered questions for the specific user - ordered by date
router.get("/user-answered-questions", (req, res) => {
  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 2;
  const queryText =
    'SELECT * FROM questions WHERE "user_id" = $1 AND "answered" = $2 ORDER BY "question_date" ASC;';
  const params = [userId, true];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for user unanswered questions:", error);
      res.sendStatus(500);
    });
});

// Get all unanswered questions for the admin view - ordered by date
router.get("/admin-unanswered-questions", (req, res) => {
  const queryText =
    'SELECT * FROM questions WHERE "answered" = $1 ORDER BY "question_date" ASC;';
  const params = [false];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for user unanswered questions:", error);
      res.sendStatus(500);
    });
});

// Get all answered questions for the admin view - ordered by date
router.get("/admin-answered-questions", (req, res) => {
  const queryText =
    'SELECT * FROM questions WHERE "answered" = $1 ORDER BY "question_date" ASC;';
  const params = [true];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for user unanswered questions:", error);
      res.sendStatus(500);
    });
});

// POST a new question without an associated article
router.post("/new-question-without-article", async (req, res) => {
  const question = req.body.question;
  // answer = null
  // answered = false
  // unread = true
  // associated_article_url = null
  const question_date = req.body.questionDate;
  // flagged = false

  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 1;

  try {
    const insertQuery = `INSERT INTO questions ("question", "answer", "answered", "unread", "associated_article_url", "question_date", "flagged", "user_id") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const insertParams = [
      question,
      null,
      false,
      true,
      null,
      question_date,
      false,
      userId,
    ];
    await pool.query(insertQuery, insertParams);

    res.sendStatus(201); // Created
  } catch (error) {
    console.log(
      "Error making POST for new user question without an associated article:",
      error
    );
    res.sendStatus(500); // Internal server error
  }
});

// POST a new question with an associated article
router.post("/new-question-with-article", async (req, res) => {
  const question = req.body.question;
  // answer = null
  // answered = false
  // unread = true
  const associated_article_url = req.body.associatedArticleUrl;
  const question_date = req.body.questionDate;
  // flagged = false

  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 1;

  try {
    const insertQuery = `INSERT INTO questions ("question", "answer", "answered", "unread", "associated_article_url", "question_date", "flagged", "user_id") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const insertParams = [
      question,
      null,
      false,
      true,
      associated_article_url,
      question_date,
      false,
      userId,
    ];
    await pool.query(insertQuery, insertParams);

    res.sendStatus(201); // Created
  } catch (error) {
    console.log(
      "Error making POST for new user question with an associated article:",
      error
    );
    res.sendStatus(500); // Internal server error
  }
});

// TODO: Change to a toggle for an unread button

// Update unread to false when a user views the answers
router.put("/user-unread", (req, res) => {
  // unread = false
  const questionId = req.body.questionId;

  const params = [false, questionId];

  const queryText = `
      UPDATE "questions"
      SET 
      "unread" = $1
      WHERE "id" = $2;`;

  pool
    .query(queryText, params)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error with updating user-unread", error);
      res.sendStatus(500);
    });
});

// Update unread to false when an admin views the questions
router.put("/admin-unread", (req, res) => {
  // unread = false
  const questionId = req.body.questionId;

  const params = [false, questionId];

  const queryText = `
    UPDATE "questions"
    SET 
    "unread" = $1
    WHERE "id" = $2;`;

  pool
    .query(queryText, params)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error with updating admin-unread", error);
      res.sendStatus(500);
    });
});

// Get the count of answered questions that are unread for the specific user (used to show the number of notifications)
router.get("/user-answered-questions-count", (req, res) => {
  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 1;

  const queryText = `
    SELECT COUNT(*) AS unread_answered_questions
    FROM "questions"
    WHERE "unread" = $1 
    AND "answered" = $2 
    AND "user_id" = $3;`;

  const params = [true, true, userId];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for user answered questions count:", error);
      res.sendStatus(500);
    });
});

// Get the count of unanswered questions that are unread for the admins (used to show the number of notifications)
router.get("/admin-unanswered-questions-count", (req, res) => {

    const queryText = `
      SELECT COUNT(*) AS unread_unanswered_questions
      FROM "questions"
      WHERE "unread" = $1 
      AND "answered" = $2;`;

    const params = [true, false];
    pool
      .query(queryText, params)
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making GET for admin unanswered questions count:", error);
        res.sendStatus(500);
      });
  });

// Update when an answer is submitted by the admin
router.put("/admin-answer", (req, res) => {
  const answer = req.body.answer;
  // answered = true
  // unread = true
  const questionId = req.body.questionId;

  const params = [answer, true, true, questionId];

  const queryText = `
      UPDATE "questions"
      SET 
      "answer" = $1, "answered" = $2, "unread" = $3
      WHERE "id" = $4;`;

  pool
    .query(queryText, params)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error with updating admin-answer", error);
      res.sendStatus(500);
    });
});


// Allows users to delete questions
router.delete("/:id", (req, res) => {
  const questionId = req.params.id;

  // TODO: const userId = req.user.id;
  // set value for testing purposes
  const userId = 2;

  pool
    .query(`DELETE FROM "questions" WHERE id = $1 AND user_id= $2`, [
      questionId,
      userId,
    ])
    .then((result) => {
      res.status(200).send("Question successfully deleted");
    })
    .catch((error) => {
      console.log("Error deleting:", error);
      res.sendStatus(500);
    });
});

module.exports = router;

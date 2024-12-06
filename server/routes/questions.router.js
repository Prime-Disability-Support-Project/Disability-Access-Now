const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config(); // ensure your env variables are loaded

//set up the nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Email notification function to admin team
function sendAdminNotification(question, username) {
  // Query to fetch admin's email
  const queryText = 'SELECT email FROM "user" WHERE "role" = 2'; // '2' is the admin role
  pool
    .query(queryText)
    .then((result) => {
      const admins = result.rows;
      if (admins.length > 0) {
        const mailOptions = {
          from: `"Disability Access Now Support Team" <${process.env.GMAIL_USER}>`, // Sender address
          to: admins.map((admin) => admin.email).join(","), // Send to all admins
          subject: "New User Question", // Subject line
          text: `Hello,

A new question has been posted by ${username}:

Question: ${question}

Please review and respond.

Thank you,
Disability Access Now Support Team`, // Plain text body
          html: `<p>Hello,</p>
                 <p>A new question has been posted by <strong>${username}</strong>:</p>
                 <p><strong>Question:</strong> ${question}</p>
                 <p>Please review and respond.</p>
                 <p>Thank you,<br>Disability Access Now Support Team</p>`, // HTML body
        };

        // Send email to the admins
        transporter
          .sendMail(mailOptions)
          .then((info) => {
            console.log("Email sent: " + info.response);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      } else {
        console.log("No admins found");
      }
    })
    .catch((error) => {
      console.error("Error fetching admin emails:", error);
    });
}

// Email confirmation when they ask a question
function sendNewUserNotification(question, email) {

  const mailOptions = {
    from: `"Disability Access Now Support Team" <${process.env.GMAIL_USER}>`, // Sender address
    to: email, // user email
    subject: "Disability Access Now - New Question Received", // Subject line
    text: `Hello,

Your question has been received:

Question: ${question}

Our admins will get back to you as soon as possible, and 
you will receive an email notification when they post their answer.


Thank you,
Disability Access Now Support Team`, // Plain text body
    html: `<p>Hello,</p>
           <p>Your question has been received:</p>
           <p><strong>Question:</strong> ${question}</p>
           <p>Our admins will get back to you as soon as possible, and you will receive an email notification when they post their answer.</p>
           <p>Thank you,<br>Disability Access Now Support Team</p>`, // HTML body
  };

  // Send email to the admins
  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent: " + info.response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
}

// Email notification function to user when a new answer is posted
function sendUserNotification(question, email) {

        const mailOptions = {
          from: `"Disability Access Now Support Team" <${process.env.GMAIL_USER}>`, // Sender address
          to: email, // user email
          subject: "Disability Access Now - New Admin Answer", // Subject line
          text: `Hello,

A new answer has been posted for one of your questions:

Question: ${question.question}
Answer: ${question.answer}

Thank you,
Disability Access Now Support Team`, // Plain text body
          html: `<p>Hello,</p>
                 <p>A new response has been posted for one of your questions:</p>
                 <p><strong>Question:</strong> ${question.question}</p>
                 <p><strong>Answer:</strong> ${question.answer}</p>
                 <p>Thank you,<br>Disability Access Now Support Team</p>`, // HTML body
        };

        // Send email to the admins
        transporter
          .sendMail(mailOptions)
          .then((info) => {
            console.log("Email sent: " + info.response);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
}



// Get all unanswered questions for the specific user - ordered by date
router.get("/user-unanswered-questions", (req, res) => {
  const userId = req.user.id;
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
  const userId = req.user.id;
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

// Get user and associated article information
router.get("/details/:id", (req, res) => {
  const queryText = `
    SELECT 
      q.associated_article_url,
      u.*,
      q.flagged
    FROM 
      questions q
    JOIN 
      "user" u ON q.user_id = u.id
    WHERE 
      q.id = $1;`;
  const params = [req.params.id];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(
        "Error making GET for associated article information:",
        error
      );
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
  const userId = req.user.id;
  const username = req.user.name;
  const email = req.user.email

  try {
    const insertQuery = `INSERT INTO questions ("question", "answer", "answered", "unread", "associated_article_url", "question_date", "flagged", "user_id") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *; `;
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
    const result = await pool.query(insertQuery, insertParams);

    const newQuestion = result.rows[0]; // This will now have the inserted question
    console.log("New question added:", newQuestion);

    // Send email notification to admins about the new question
    sendAdminNotification(newQuestion, username);
    sendNewUserNotification(newQuestion, email)

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
  console.log('req.body', req.body)
  const question = req.body.question;
  // answer = null
  // answered = false
  // unread = true
  const associated_article_url = req.body.associatedArticleUrl;
  const question_date = req.body.questionDate;
  // flagged = false

  const userId = req.user.id;
  const username = req.user.name;
  const email = req.user.email


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
    const result = await pool.query(insertQuery, insertParams);

    const newQuestion = result.rows[0];

    // Send email notification to admins about the new question
    sendAdminNotification(question, username);
    sendNewUserNotification(question, email)

    res.sendStatus(201); // Created
  } catch (error) {
    console.log(
      "Error making POST for new user question with an associated article:",
      error
    );
    res.sendStatus(500); // Internal server error
  }
});

// Toggle unread between true and false for user's viewing admin answers
router.put("/user-unread", (req, res) => {
  const questionId = req.body.questionId;

  const params = [questionId];

  const queryText = `
      UPDATE "questions"
      SET 
      "unread" = NOT "unread"
      WHERE "id" = $1;`;

  console.log(params);
  pool
    .query(queryText, params)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error toggling user-unread status", error);
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

// Toggle flagged in questions
router.put("/flag", (req, res) => {
  // unread = false
  const questionId = req.body.questionId;

  const params = [questionId];

  console.log(questionId)

  const queryText = `
    UPDATE "questions"
    SET 
    "flagged" = NOT "flagged"
    WHERE "id" = $1;`;

  pool
    .query(queryText, params)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error with updating flagged", error);
      res.sendStatus(500);
    });
});

// Get the count of answered questions that are unread for the specific user (used to show the number of notifications)
router.get("/user-answered-questions-count", (req, res) => {
  const userId = req.user.id;

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
      console.log(
        "Error making GET for admin unanswered questions count:",
        error
      );
      res.sendStatus(500);
    });
});

// Update when an answer is submitted by the admin
router.put("/admin-answer", (req, res) => {
  const question = {
    question: req.body.question,
    answer: req.body.answer,
    questionId: req.body.questionId,
    email: req.body.email
  };
  // answered = true
  // unread = true

  const email = question.email

  const params = [question.answer, true, true, question.questionId];

  const queryText = `
      UPDATE "questions"
      SET 
      "answer" = $1, "answered" = $2, "unread" = $3
      WHERE "id" = $4;`;

  sendUserNotification(question, email);

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

// Allows admins to delete answered questions from the history
router.delete("/:id", (req, res) => {
  const questionId = req.params.id;

  pool
    .query(`DELETE FROM "questions" WHERE id = $1`, [questionId])
    .then((result) => {
      res.status(200).send("Question successfully deleted");
    })
    .catch((error) => {
      console.log("Error deleting:", error);
      res.sendStatus(500);
    });
});

module.exports = router;

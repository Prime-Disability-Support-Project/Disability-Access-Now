const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const nodemailer = require("nodemailer");
require ('dotenv').config(); // ensure your env variables are loaded 



//set up the nodemailer transporter using Gmail 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Email notification function to admin team
function sendAdminNotification(question, username) {
  // Query to fetch admin's email 
  const queryText = 'SELECT email FROM "user" WHERE "role" = 2'; // '2' is the admin role
  pool.query(queryText)
    .then(result => {
      const admins = result.rows;
      if (admins.length > 0) {
        const mailOptions = {
          from: `"Support Team" <${process.env.GMAIL_USER}>`, // Sender address
          to: admins.map(admin => admin.email).join(','), // Send to all admins
          subject: "New User Question", // Subject line
          text: `Hello,

A new question has been posted by  ${username}:

Question: ${question.question}

Please review and respond as needed.

Best regards,
Support Team`, // Plain text body
          html: `<p>Hello,</p>
                 <p>A new question has been posted by <strong>${username}</strong>:</p>
                 <p><strong>Question:</strong> ${question.question}</p>
                 <p>Please review and respond as needed.</p>
                 <p>Best regards,<br>Support Team</p>`, // HTML body
        };

        // Send email to the admins
        transporter.sendMail(mailOptions)
          .then(info => {
            console.log('Email sent: ' + info.response);
          })
          .catch(error => {
            console.error('Error sending email:', error);
          });
      } else {
        console.log('No admins found');
      }
    })
    .catch(error => {
      console.error('Error fetching admin emails:', error);
    });
}

// Email notification function to user
function sendUserNotification(question, name) {
  // Query to fetch admin's email 
  const queryText = 'SELECT email FROM "user" WHERE id = $1'; 
  const userId = req.user.id;
  const params = [userId]
  pool.query(queryText, params)
    .then(result => {
      const user = result.rows
      console.log('user', user)
      if (user) {
        const mailOptions = {
          from: `"Support Team" <primedisabilitysupp@gmail.com>`, // Admin email
          to: user[0].email, // user email
          subject: "New Admin Answer", // Subject line
          text: `Hello ${name},

A new answer has been posted:

Question: ${question.question}
Answer: ${question.answer}

Best regards,
Support Team`, // Plain text body
          html: `<p>Hello ${name},</p>
                 <p>A new response has been posted by the admins:</p>
                 <p><strong>Question:</strong> ${question.question}</p>
                 <p><strong>Answer:</strong> ${question.answer}</p>
                 <p>Best regards,<br>Support Team</p>`, // HTML body
        };

        // Send email to the admins
        transporter.sendMail(mailOptions)
          .then(info => {
            console.log('Email sent: ' + info.response);
          })
          .catch(error => {
            console.error('Error sending email:', error);
          });
      } else {
        console.log('No admins found');
      }
    })
    .catch(error => {
      console.error('Error fetching admin emails:', error);
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
    console.log('New question added:', newQuestion);

    // Send email notification to admins about the new question
    sendAdminNotification(newQuestion, username);

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

  const userId = req.user.id;
  const username = req.user.name;

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
    console.log('New question added:', newQuestion);


     // Send email notification to admins about the new question
     sendAdminNotification(newQuestion, username);
     
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

      console.log(params)
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
        console.log("Error making GET for admin unanswered questions count:", error);
        res.sendStatus(500);
      });
  });

// Update when an answer is submitted by the admin
router.put("/admin-answer", (req, res) => {
  const question = {question: req.body.question, answer: req.body.answer, questionId: req.body.questionId}
  // answered = true
  // unread = true
  const name = req.user.name

  const params = [question.answer, true, true, question.questionId];

  const queryText = `
      UPDATE "questions"
      SET 
      "answer" = $1, "answered" = $2, "unread" = $3
      WHERE "id" = $4;`;

  pool
    .query(queryText, params)
    .then((result) => {
      res.sendStatus(200);
      sendUserNotification(question, name)
    })
    .catch((error) => {
      console.log("Error with updating admin-answer", error);
      res.sendStatus(500);
    });
});


// Allows users to delete questions
router.delete("/:id", (req, res) => {
  const questionId = req.params.id;

  const userId = req.user.id;


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

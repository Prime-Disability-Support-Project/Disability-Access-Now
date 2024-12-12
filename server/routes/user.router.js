const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const nodemailer = require("nodemailer");
require ('dotenv').config(); // ensure your env variables are loaded 

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Gets all users that have not been approved
router.get("/allPending", rejectUnauthenticated, (req, res) => {
  const queryText =
    'SELECT * FROM "user" WHERE approved = false ORDER BY "id" ASC;';
  pool
    .query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for all pending users:", error);
      res.sendStatus(500);
    });
});

// Gets all users who have been approved
router.get("/allApproved", rejectUnauthenticated, (req, res) => {
  const queryText =
    'SELECT * FROM "user" WHERE approved = true ORDER BY "name" ASC;';
  pool
    .query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for all approved users:", error);
      res.sendStatus(500);
    });
});

// set approved to true for the selected user
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  console.log('req.body', req.body)
  const email = req.body.email
  const queryText = `
    UPDATE "user"
    SET "approved" = true
    WHERE "id" = $1;
  `;

  const params = [userId];

  sendApprovalNotification(email)
  pool
    .query(queryText, params)
    .then(() => {
      res.sendStatus(200); // Success
    })
    .catch((error) => {
      console.error("Error with updating approved:", error);
      res.sendStatus(500); // Server error
    });
});

// toggles user role between user (1) and admin (2)
router.put("/privileges/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;

  // SQL query for the toggle
  const queryText = `
    UPDATE "user"
    SET "role" = CASE
      WHEN "role" = 1 THEN 2
      ELSE 1
    END
    WHERE "id" = $1;
  `;

  const params = [userId];

  pool
    .query(queryText, params)
    .then(() => {
      res.sendStatus(200); // Success
    })
    .catch((error) => {
      console.error("Error with updating privileges:", error);
      res.sendStatus(500); // Server error
    });
});

// remove the selected user
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  const queryText = `
    DELETE FROM "user"
    WHERE "id" = $1;
  `;

  const params = [userId];

  pool
    .query(queryText, params)
    .then(() => {
      res.sendStatus(200); // Success
    })
    .catch((error) => {
      console.error("Error with removing user:", error);
      res.sendStatus(500); // Server error
    });
});

//set up the nodemailer transporter using Gmail 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Email notification function to admin team
function sendRegistrationNotification(email) {
  // Query to fetch admin's email 
  
        const mailOptions = {
          from: `"Support Team" <${process.env.GMAIL_USER}>`, // Sender address
          to: email,
          subject: "Disability Access Now - Registration Received", // Subject line
          text: `Hello,



Your registration has been received and is currently pending approval. 
Our admin team will review your request and respond back as soon as possible. 
You will receive an email notification once the review is finished. 
Please note that you will not be able to log in until you are approved.






Best regards,
Support Team`, // Plain text body
          html: `<p>Hello,</p>
                 <p>Your registration has been received and is currently pending approval.</p>
                 <p>Our admin team will review your request and respond back as soon as possible.</p>
                 <p>You will receive an email notification once the review is finished.</p>
                 <p>Please note that you will not be able to log in until you are approved.</p>
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
    
    }
    
// Email notification function to admin team
function sendApprovalNotification(email) {
  // Query to fetch admin's email 
  
        const mailOptions = {
          from: `"Support Team" <${process.env.GMAIL_USER}>`, // Sender address
          to: email,
          subject: "Disability Access Now - Registration Approved!", // Subject line
          text: `Hello,



Your registration has been approved, and you are now able to log in. 


Best regards,
Support Team`, // Plain text body
          html: `<p>Hello,</p>
                 <p>Your registration has been approved, and you are now able to log in.</p>
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
    
    }




// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  // approved = false
  // role = 1
  const password = encryptLib.encryptPassword(req.body.password);

sendRegistrationNotification(email);
  const queryText = `INSERT INTO "user" (name, password, email, role, approved)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [name, password, email, 1, false])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  console.log("login attempted");
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;

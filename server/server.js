const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const answersRouter = require('./routes/answers.router');  // importing ans routes 
const questionsRouter = require('./routes/questions.router'); // importing questions routes 
const articlesRouter = require('./routes/articles.router');  // importing article routes

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter); //user routes 
app.use('/api/answers', answersRouter) // answers 
app.use('/api/questions', questionsRouter) // questions 
app.use('/api/articles', articlesRouter)  // articles 

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

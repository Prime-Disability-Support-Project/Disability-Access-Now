const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser'); // parses incoming req bodies
const cors = require('cors'); // Cross-Origin Resource Sharing (CORS), used with Express for APIs

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const questionsRouter = require('./routes/questions.router'); // importing questions routes 
const articlesRouter = require('./routes/articles.router');  // importing article routes
const savedRouter = require('./routes/saved.router') // importing files routes
const filesRouter = require('./routes/files.router'); // importing files routes

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Body Parser Middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/user', userRouter); //user routes 
app.use('/api/questions', questionsRouter) // questions 
app.use('/api/articles', articlesRouter)  // articles 

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

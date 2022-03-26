const express = require('express');
const mongoose = require('mongoose');
const io = require('socket.io');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const socketModule = require('./socket');
const config = require('./config');

require('./middleware/passport')(passport);

const userApiRouter = require('./user/user.route');
// const adApiRouter = require('./routes/api/advertisement');
const chatApiRouter = require('./chat/chat.route'); // for testing DB!!!

const app = express();
const server = require('http').createServer(app);
const socketIo = io(server);
const db = config.mongoURI;

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express Session
app.use(session({
  cookie: {
    secure: false,
    maxAge: null
  },
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(socketModule(socketIo));

// Router
app.use('/api', userApiRouter);
// app.use('/api/advertisements', adApiRouter);
app.use('/api/chat', chatApiRouter); // for testing DB!!!

(async () => {
  try {
    // DB Connect
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected...'))
      .catch(err => console.log(err));

    // Start server
    return server.listen(config.port, () => {
        console.log(`Server is litening on port ${config.port}`);
    });
  } catch (error) {
      console.error('Connection MongoDB error...', error);
      process.exit(1);
  }
})()

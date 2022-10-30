//dot-env
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });

//express module
const express = require('express');
const { Server } = require('socket.io');

// Init express
const app = express();

//cors
const cors = require('cors');
app.use(cors({ origin: '*' }));

// Express internal BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express-router
const rootRouter = require('./routes/root_router');
const userRouter = require('./routes/user_router');

app.use('/v2', rootRouter);
app.use('/v2/users', userRouter);

// v1 legacy
const indexRouter = require('./v1/routes/index');
const accountRouter = require('./v1/routes/account');
const symptomsRouter = require('./v1/routes/symptoms');
const medicinesRouter = require('./v1/routes/medicines');

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/symptoms', symptomsRouter);
app.use('/medicines', medicinesRouter);

// Create HTTP server
const server = app.listen(3000, () =>
  console.log('Init: YS-SWDH-Hackathon-2022! API V2')
);

// Create Socket.io

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('I: Socket Connected');

  socket.on('message', (message) => {
    console.log('I: Socket Message', message);
  });

  socket.on('disconnect', (reason) => {
    console.log(`I: Socket Disconnected (${reason})`);
  });
});

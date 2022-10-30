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
const medicineRouter = require('./routes/medicine_router');
const symptomsRouter = require('./routes/symptom_router');

app.use('/v2', rootRouter);
app.use('/v2/users', userRouter);
app.use('/v2/medicines', medicineRouter);
app.use('/v2/symptoms', symptomsRouter);

// v1 legacy
const indexRouter1 = require('./v1/routes/index');
const accountRouter1 = require('./v1/routes/account');
const symptomsRouter1 = require('./v1/routes/symptoms');
const medicinesRouter1 = require('./v1/routes/medicines');

app.use('/', indexRouter1);
app.use('/account', accountRouter1);
app.use('/symptoms', symptomsRouter1);
app.use('/medicines', medicinesRouter1);

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

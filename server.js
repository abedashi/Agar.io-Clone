require('dotenv').config();
require('colors');

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`Express and Socketio are listing on port ${port.yellow}`));

const socketio = require('socket.io');
const io = socketio(server);
const helmet = require('helmet');
app.use(helmet());

module.exports = { app, io }

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const server = express();

mongoose.connect(config.database.url_connection, {
    useNewUrlParser: true,
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(config.server.port);
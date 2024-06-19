const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI);
require('./routes/authRoutes')(app);

app.listen(PORT);

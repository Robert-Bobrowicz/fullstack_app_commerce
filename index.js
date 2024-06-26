const express = require('express');
const mongoose = require('mongoose');
const coockieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();
const PORT = process.env.PORT || 5000;

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

app.use(coockieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

app.listen(PORT);

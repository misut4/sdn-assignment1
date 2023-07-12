const express = require("express");
require("dotenv").config();
const methodOverride = require("method-override");
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
// const authenticate = require('./authenticate');
const DBConnection = require("./dbModule");
const { RedisClientConnection } = require("./utils/redis-cache");

const app = express();

app.set("view engine", "ejs");

//json bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// method overrides
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("_method"));

// passport
app.use(
  session({
    secret: "secrethehe",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//mongo connection
DBConnection();

RedisClientConnection();

//router declarations
const nationRoute = require("./routes/nationRouter");
const playersRoute = require("./routes/playerRouter");
const userRoute = require("./routes/userRouter");
const pugRouter = require("./routes/pugRouter");

app.use("/nation", checkAuthenticated, nationRoute);
app.use("/player", checkAuthenticated, playersRoute);
app.use("/user", userRoute);
app.use("/", pugRouter);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

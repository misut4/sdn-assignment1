const express = require("express");
const app = express();
const rect = require("./rectangle");
const methodOverride = require('method-override')
const port = 3000;
const bodyParser = require("body-parser");
const DBConnection = require("./dbModule");

app.set('view engine', 'ejs');

//json bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'))

//mongo connection
DBConnection();

//router declarations
const nationRoute = require("./routes/nationRouter");
const playersRoute = require("./routes/playerRouter");
const pugRouter = require("./routes/pugRouter");

app.use("/nation", nationRoute);
app.use("/player", playersRoute);
app.use("/", pugRouter);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

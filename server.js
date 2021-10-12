/********************************
Dependencies
********************************/

const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const EventRouter = require("./controllers/event");
const UserRouter = require("./controllers/user");
const session = require('express-session');
const MongoStore = require('connect-mongo');

/********************************
Express Object
********************************/

const app = express();

/********************************
Middleware
********************************/

app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL,
  saveUninitialized: true,
  resave: false
  })
}))
/********************************
Routers
********************************/

app.use("/events", EventRouter)
app.use("/user", UserRouter)

/********************************
Server Listener
********************************/

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!`)
})

/////////////////////////////////
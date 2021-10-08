/********************************
Dependencies
********************************/

const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const EventRouter = require("./controllers/event")

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

/********************************
Routers
********************************/

app.use("/events", EventRouter)

/////////////////////////////////
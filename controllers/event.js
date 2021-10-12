/********************************
Dependencies
********************************/

const express = require("express");
const Event = require("../models/event");
const User = require("../models/user");

/********************************
Create Event Router
********************************/

const router = express.Router();

/********************************
MiddleWare
********************************/

const dateParser = (time, date) => {
  const hour = Number(time.slice(0, 2));
  const minute = Number(time.slice(3));
  const day = Number(date.slice(8));
  const month = Number(date.slice(5, 7)) - 1;
  const year = Number(date.slice(0, 4));
  const when = new Date(year, month, day, hour, minute);
  return when;
}

/********************************
Events Routes
********************************/

//Index Route
router.get("/", (req,res) => {
  console.log("Req Session:")
  console.log(req.session);
  Event.find({}, (err, events) => {
    res.render("./events/index.ejs", { events, session: req.session });
  });
});

//New Route
router.get("/new", (req,res) => {
  res.render("./events/new.ejs");
});

//Delete Route
router.delete("/:id", (req,res) => {
  const id = req.body.id;
  Event.findByIdAndRemove({ id }, (err, event) => {
    console.log("Deleted Event:");
    console.log(event);
    res.redirect("/events");
  });
});

//Update Route
router.put("/:id", (req,res) => {
  const id = req.params.id;
  console.log(req.body);

  Event.findByIdAndUpdate(id, req.body, {new: true}, (err, event) => {
    res.redirect("/events");
  });
});

//Create Route
router.post("/", (req,res) => {
  const { time, date } = req.body;
  req.body.date = dateParser(time, date);
  delete req.body.time.delete
  req.body.zip = Number(req.body.zip);
  req.body.attendees = [];
  req.body.organizer = 1;
  console.log(req.body);

  Event.create(req.body, (err, event) => {
    res.redirect("/events");
  });
});

//Edit Route
router.get("/:id/edit", (req,res) => {
  const id = req.params.id;
  Event.findById(id, (err, event) => {
    res.render("./events/edit.ejs", { event, session: req.session });
  });
});

//Show Route
router.get("/:id", (req,res) => {
  const id = req.body.id;
  Event.findById({ id }, (err, event) => {
    res.render("./events/show.ejs", { event, session: req.session });
  });
});

/********************************
Export Router
********************************/

module.exports = router;

/////////////////////////////////
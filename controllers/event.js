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

const prepBody = () => {
  req.body.zip = Number(req.body.zip);
  req.body.attendees = [];
  req.body.organizer = req.session._id;
  const newDate = new Date (req.body.date);
  console.log(newDate);
};

/********************************
Events Routes
********************************/

//Index Route
router.get("/", (req,res) => {
  Event.find({}, (err, events) => {
    res.render("./events/index.ejs", { events, session: req.session });
  });
});

//New Route
router.get("/new", (req,res) => {
  res.render("./events/new.ejs", { session: req.session });
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

  //Make new Date Object
  const { time, date } = req.body;
  req.body.date = new Date(date + "T" + time);
  delete req.body.time;

  //Set other properties of the Body
  req.body.zip = Number(req.body.zip);

  Event.findByIdAndUpdate(id, req.body, {new: true}, (err, event) => {
    res.redirect("/events");
  });
});

//Create Route
router.post("/", (req,res) => {

  //Make new Date Object
  const { time, date } = req.body;
  req.body.date = new Date(date + "T" + time);
  delete req.body.time;

  //Set other properties of the Body
  req.body.zip = Number(req.body.zip);
  req.body.attendees = [];
  req.body.organizer = req.session._id;


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
  const id = req.params.id;

  Event.findOne({ _id: id }, (err, event) => {
    if (req.session.loggedIn) {
      username = req.session.username;
      User.findOne({ username }, (err, user) => {
        res.render("./events/show.ejs", { user, event, session: req.session });
      });
    } else {
      res.render(".events/show.ejs", {})
    }
  });
});

/********************************
Export Router
********************************/

module.exports = router;

/////////////////////////////////
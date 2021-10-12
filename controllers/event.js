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
  console.log(req.body);

  Event.findByIdAndUpdate(id, req.body, {new: true}, (err, event) => {
    res.redirect("/events");
  });
});

//Create Route
router.post("/", (req,res) => {
  req.body.zip = Number(req.body.zip);
  req.body.attendees = [];
  console.log(req.session._id)
  req.body.organizer = req.session._id;
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
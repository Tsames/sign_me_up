/********************************
Dependencies
********************************/

const express = require("express");
const Event = require("../models/event");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/********************************
Create Router
********************************/

const router = express.Router();

/********************************
Routes
********************************/

/******** Signup Routes ********/

//New Route
router.get("/signup", (req,res) => {
  res.render("./users/signup.ejs", { session: req.session });
})

//Create Route
router.post("/signup", async (req,res) => {
  //Hash the Password
  req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
  //Create the user
  User.create(req.body, (err, user) => {
    console.log("User created!");
    console.log(user)
    res.redirect("/user/login");
  })
})

/******** Login Routes ********/

//Get Login Form Route
router.get("/login", (req,res) => {
  res.render("./users/login.ejs", { session: req.session })
})

//Login Route
router.post("/login", (req,res) => {
  const {username, password } = req.body;
  
  User.findOne({ username }, (err, user) => {
    if(!user) {
      res.send("User does not exist!")
    } else {
      const result = bcrypt.compareSync(password, user.password);
      if (result) {
        req.session.username = username;
        req.session.loggedIn = true;
        res.redirect("/events");
      } else {
        res.send("incorrect password");
      }
    }
  });
});

//Logout Route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/events");
  });
});

//Show Route
router.get("/:username", (req, res) => {
  const username = req.params.username;
  User.findOne({ username }, (err, user) => {
    Event.find({ organizer: user._id }, (err, myEvents) => {
      Event.find({ attendees: `${username}` }, (err, goingEvents) => {
        res.render("users/show.ejs", { user: user.username, myEvents, goingEvents, session: req.session });
      });
    });
  });
});

/********************************
Export the Router
********************************/

module.exports = router;

/////////////////////////////////
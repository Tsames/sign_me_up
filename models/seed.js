/********************************
Dependencies
********************************/

const mongoose = require("mongoose");
const User = require("./user");
const Event = require("./event");

/********************************
Seed DB
********************************/

mongoose.connection.on("open", () => {

  User.findOne({ username: "tom" }, (err, tom) => {

    const exampleEvents = [
      { name: "Delightful June Picnic", description: "Its gonna be nice sunny day! Bring lots of tasty food!", date: "06/15/2021", time: "14:15PM", address: "1256 Good Feelin Ln", state: "CA", city: "Redwood City", zip: 12345, attendees: [], organizer: tom._id },
      { name: "Lakshmi's Birthday", description: "Its Lakshmi's birthday, but its a  surprise so don't tell anyone. Make sure to come early!", date: "11/15/2021", time: "05:16PM", address: "9876 Big Surprise Rd", state: "CA", city: "Mountain View", zip: 12345, attendees: [], organizer: tom._id }
    ]

    Event.remove({}, (err,data) => {

      Event.create(exampleEvents, (err, data) => {
        console.log("--------EVENTS CREATED----------");
        console.log(data);
        console.log("------------^^^^^^^^^^----------");

        mongoose.connection.close();
      });
    });
  });
});


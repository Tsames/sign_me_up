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

    const dateOne = new Date("2021-06-15T14:15");
    const dateTwo = new Date("2021-11-15T17:16");

    const exampleEvents = [
      { name: "Delightful June Picnic", description: "Its gonna be nice sunny day! Bring lots of tasty food!", image: "https://picnic.barcelona/wp-content/uploads/2018/06/picnics-setup-4.jpg", date: dateOne, address: "1256 Good Feelin Ln", state: "CA", city: "Redwood City", zip: 12345, attendees: [], organizer: tom._id },
      { name: "Lakshmi's Birthday", description: "Its Lakshmi's birthday, but its a  surprise so don't tell anyone. Make sure to come early!", image: "https://www.photojaanic.com/blog/wp-content/uploads/sites/2/2020/03/Birthday-Wishes.jpg",date: dateTwo, address: "9876 Big Surprise Rd", state: "CA", city: "Mountain View", zip: 12345, attendees: [], organizer: tom._id }
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


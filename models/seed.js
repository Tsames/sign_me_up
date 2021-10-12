/********************************
Dependencies
********************************/

const mongoose = require("mongoose");
const Event = require("./event");

/********************************
Seed DB
********************************/

mongoose.connection.on("open", () => {

  const dateOne = new Date(2021, 05, 15, 14, 45);
  const dateTwo = new Date(2021, 10, 15, 17, 30);

  const exampleEvents = [
    { name: "Delightful June Picnic", description: "Its gonna be nice sunny day! Bring lots of tasty food!", date: dateOne, address: "1256 Good Feelin Ln", state: "CA", city: "Redwood City", zip: 12345, attendees: [], organizer: "tom" },
    { name: "Lakshmi's Birthday", description: "Its Lakshmi's birthday, but its a  surprise so don't tell anyone. Make sure to come early!", date: dateTwo, address: "9876 Big Surprise Rd", state: "CA", city: "Mountain View", zip: 12345, attendees: [], organizer: "tom" }
  ]


  Event.remove({}, (err,data) => {

    Event.create(exampleEvents, (err, data) => {
      console.log("--------EVENTS CREATED----------");
      console.log(data);
      console.log("------------^^^^^^^^^^----------");

      mongoose.connection.close();
    })

  })
  
})


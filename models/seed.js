/********************************
Dependencies
********************************/

const mongoose = require("mongoose");
const Event = require("./event");

/********************************
Seed DB
********************************/

mongoose.connection.on("open", () => {



  const exampleEvents = [
    {name: "ex event one", }
  ]
})
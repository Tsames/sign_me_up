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
    {name: "ex event one", address: "example address one", state: "example state one", city: "example city one", zip: 12345 },
    { name: "ex event two", address: "example address two", state: "example state two", city: "example city two", zip: 67890 }
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


/********************************
Dependencies
********************************/

const mongoose = require("./connection");

/********************************
Define Event Model
********************************/

const Schema = mongoose.Schema;
const model = mongoose.model;

const eventSchema = new Schema({
  name: String,
  address: String,
  state: String,
  city: String,
  zip: Number,
  date: Date,
  attendees: Array,
  organizer: Number
})

const Event = model("Event", eventSchema);

/********************************
Export Event Model
********************************/

module.exports(Event);

/////////////////////////////////
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
  description: String,
  image: String,
  date: Date,
  address: String,
  state: String,
  city: String,
  zip: Number,
  attendees: Array,
  organizer: Object
})

const Event = model("Event", eventSchema);

/********************************
Export Event Model
********************************/

module.exports = Event;

/////////////////////////////////
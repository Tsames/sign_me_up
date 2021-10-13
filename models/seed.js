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
    const dateTwo = new Date("2021-11-15T17:45");
    const dateThree = new Date("2021-07-05T11:15");
    const dateFour = new Date("2021-07-04T20:30");
    const dateFive = new Date("2021-11-22T18:00");
    const dateSix = new Date("2021-08-28T19:30");
    const dateSeven = new Date("2021-02-09T13:00");
    const dateEight = new Date("2021-04-21T20:30");

    const exampleEvents = [
      { name: "Delightful June Picnic", description: "Its gonna be nice sunny day! Bring lots of tasty food!", image: "https://picnic.barcelona/wp-content/uploads/2018/06/picnics-setup-4.jpg", date: dateOne, address: "1256 Good Feelin Ln", state: "CA", city: "Redwood City", zip: 12345, attendees: [], organizer: tom._id },
      { name: "Lakshmi's Birthday", description: "Its Lakshmi's birthday, but its a surprise so don't tell anyone. Make sure to come early!", image: "https://www.photojaanic.com/blog/wp-content/uploads/sites/2/2020/03/Birthday-Wishes.jpg",date: dateTwo, address: "9876 Big Surprise Rd", state: "CA", city: "Mountain View", zip: 12345, attendees: [], organizer: tom._id },
      { name: "A day at the Beach", description: "Its spring break! We are all heading down to the beach and catching some sun!", image: "https://273hny3uh9sk23twrq16r4aw-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/stock-footage-young-people-in-silhouette-enjoying-time-together-dancing-having-fun-beach-break-at-sunset-shot-on.jpg", date: dateThree, address: "the beach!", state: "CA", city: "Half Moon Bay", zip: 12345, attendees: [], organizer: tom._id },
      { name: "Fourth of July Fireworks", description: "Its the fourth of july and we are heading into town to see the big firework show!", image: "https://fthmb.tqn.com/LP4_NoRsJCWGS0tIGa0vEBAru9o=/4256x2832/filters:fill(auto,1)/low-angle-view-of-firework-display-over-river-during-sunset-604213021-57752e7b3df78cb62c11aba4.jpg", date: dateFour, address: "1134 Legal Fireworks Blvd", state: "CA", city: "San Mateo", zip: 12345, attendees: [], organizer: tom._id },
      { name: "Thanksgiving dinner", description: "Uncle Joe and Aunt Marie are hosting Thanksgiving this year. Its a big family reunion!", image: "https://cdn.vox-cdn.com/thumbor/5XSoz9o0y4NHf_NIg6dUoLbMoyM=/0x0:5760x3840/1200x800/filters:focal(2420x1460:3340x2380)/cdn.vox-cdn.com/uploads/chorus_image/image/62335350/millennial_turkey.1542295610.jpg", date: dateFive, address: "5678 Who do we appreciate St", state: "CA", city: "San Jose", zip: 12345, attendees: [], organizer: tom._id },
      { name: "Matilda's Concert", description: "Matilda and her band are performing downtown, lets go all out to support her first official concert!", image: "https://i.pinimg.com/originals/9c/82/ce/9c82cec3a5ca466993a92028f4131e12.jpg", date: dateSix, address: "Downtown Sunnyvale", state: "CA", city: "Sunnyvale", zip: 12345, attendees: [], organizer: tom._id },
      { name: "Big snowball fight", description: "We're having a big snowball fight on campus, be there or miss out on the biggest even of second semester", image: "http://www.pxleyes.com/blog/wp-content/uploads/winter-sports/49.jpg", date: dateSeven, address: "Downtown Sunnyvale", state: "CA", city: "Sunnyvale", zip: 12345, attendees: [], organizer: tom._id },
      { name: "Steve's bar crawl", description: "Steve didn't have a proper bachelor party, so were throwing him a belated bar crawl party!", image: "https://cdn.vox-cdn.com/thumbor/jWqYcdf9sbEcANA8G02rJFWOEYI=/0x74:960x614/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/49155101/nickelandryeFB.0.0.0.jpg", date: dateEight, address: "Downtown Sunnyvale", state: "CA", city: "Sunnyvale", zip: 12345, attendees: [], organizer: tom._id },
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


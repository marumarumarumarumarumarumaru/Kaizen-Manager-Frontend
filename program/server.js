const express = require("express");
require("dotenv").config();

const app = express();




// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
 db.sequelize.sync().then(()=> {
    console.log("syncing db")
 });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Mainichi app backend api." });
});



// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.HOST}:${PORT}.`);
 
});
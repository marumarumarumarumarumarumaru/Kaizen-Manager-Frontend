import express from "express";
import dotenv from "dotenv"
import {db} from "./models/index.mjs";

const app = express();




// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


 db.sequelize.sync().then(()=> {
    console.log("syncing db")
 });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Kaizen app backend api." });
});


// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.HOST}:${PORT}.`);
 
});
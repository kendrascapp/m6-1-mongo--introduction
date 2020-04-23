"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;
const { getCollection } = require("./exercises/exercise-1-2");
const {
  createGreeting,
  getGreetings,
  getGreeting,
  deleteGreeting,
  updateGreeting,
} = require("./exercises/exercise-2");
express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  // exercise 1
  .get("/ex-1/:dbName/:collection", getCollection)
  // exercise 2
  .post("/ex-2/greeting", createGreeting) //creating the database entry
  .get("/ex-2/greeting/:_id", getGreeting) //get is retrieving a single piece of data/entry from the database and showing it
  .get("/ex-2/greeting", getGreetings) //this gets ALL of the database entries and shows them all
  .delete("/ex-2/greeting/:_id", deleteGreeting) //first delete gets the database entry by its ID, and then deletes it individually
  .put("/ex-2/greeting/:_id", updateGreeting) //first gets database entry by ID, then updates it
  // C - CREATE = POST
  // R - READING = GET
  // U - UPDATING = PUT
  // DELETE = DELETING
  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));

const fs = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");

const greetings = JSON.parse(fs.readFileSync("./data/greetings.json"));

const batchImport = async () => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  try {
    client.connect();
    const db = await client.db("exercises");
    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

batchImport();

//left off at 2.3

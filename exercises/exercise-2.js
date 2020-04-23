const assert = require("assert");
const { MongoClient } = require("mongodb");
const createGreeting = async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  try {
    client.connect();
    console.log(req.body);
    const db = await client.db("exercises");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};
const getGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("exercises");
  db.collection("greetings").findOne(
    { _id: _id.toUpperCase() },
    (err, result) => {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
      client.close();
    }
  );
};
const getGreetings = async (req, res) => {
  // create a new client
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("exercises");
  db.collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result.length) {
        const start = Number(req.query.start) || 0;
        const cleanStart = start > -1 && start < result.length ? start : 0;
        const end = cleanStart + (Number(req.query.limit) || 25);
        const cleanEnd = end > result.length ? result.length - 1 : end;
        const data = result.slice(cleanStart, cleanEnd);
        res.status(200).json({ status: 200, data });
      } else {
        res.status(404).json({ status: 404, data: "Not Found" });
      }
      client.close();
    });
};
const deleteGreeting = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("exercises");
  try {
    await client.connect();
    const db = client.db("exercises");
    const r = await db
      .collection("greetings")
      .deleteOne({ _id: _id.toUpperCase() });
    assert.equal(1, r.deletedCount);
    res.status(204).json({ status: 204, _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};
const updateGreeting = async (req, res) => {
  const { _id } = req.params; //means get the ID from the URL
  const { hello } = req.body; //get the body (the key of the body) from the database
  if (!hello) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: 'Only "hello" may be updated.',
    });
    return;
  }
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("exercises");
  try {
    await client.connect();
    const db = client.db("exercises");
    const query = { _id };
    const newValues = { $set: { hello } };
    const r = await db.collection("greetings").updateOne(query, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};
module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};

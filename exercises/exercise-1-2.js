const { MongoClient } = require("mongodb");

const getCollection = async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifitedTopology: true,
  });
  const { dbName, collection } = req.params;
  await client.connect();
  const db = client.db(dbName);
  await db
    .collection(collection)
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(400).json({ status: 400, connection: "error" });
      } else {
        res.status(200).json({ status: 200, connection: data });
      }
    });
};

module.exports = { getCollection };

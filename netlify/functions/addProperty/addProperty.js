const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.REACT_APP_DB_CONNECTION);

const clientPromise = mongoClient.connect();

const handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    const database = (await clientPromise).db(process.env.REACT_APP_DB_NAME);
    const collection = database.collection("vacantproperties");
    const result = await collection.insertOne(data);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };

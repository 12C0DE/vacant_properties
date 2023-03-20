const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.REACT_APP_DB_CONNECTION);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    const database = (await clientPromise).db(process.env.REACT_APP_DB_NAME);
    const collection = database.collection("propertyTypes");
    const results = await collection.find().toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };

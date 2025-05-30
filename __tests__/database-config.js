// const { MongoMemoryServer } = require("mongodb-memory-server")
// const {MongoClient} = require('mongodb');
// const mongoose = require("mongoose")


// let connection = MongoClient;
// let mongoServer = MongoMemoryServer;

// const connect = async () => {
//   mongoServer = await MongoMemoryServer.create();
//   connection = await MongoClient.connect(mongoServer.getUri(), {});
// };

// const close = async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// };

// const clear = async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany({});
//   }
// };

// module.exports = { connect, close, clear };
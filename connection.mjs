const {MongoClient} = require("mongodb");
const connectionString = process.env.ATLAS_URI || "mongodb+srv://Cluster10757:W3yUnAg8fKiFmDiW@cluster10757.kagjlun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10757";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("mongodbVSCodePlaygroundDB");

module.exports = db;

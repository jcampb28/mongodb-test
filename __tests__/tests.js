const db = require("../connection.mjs")
const {seed, seedProducts } = require("../db/seed/seed")
const mongoose = require("mongoose")



beforeAll(() => 
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connected to" + db);
        seed(seedProducts)
    })
)
    
// afterEach(async () => await db.clear()) 
afterAll(() => mongoose.connection.close()) 

test("4 items have a price of 10", () => {
    const test = db.getCollection("test").find({price: {$eq: 100}}).count()
    expect(test).toBe(1)
}, 10000)
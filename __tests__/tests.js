const request = require("supertest");
const app = require("../server/server");

const { connectDB } = require("../db/connection");
const { seed } = require("../db/seed/seed");
const mongoose = require("mongoose");

beforeAll(async () => {
  await connectDB();
  await seed();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Products API", () => {
  test("GET /products returns list of products", async () => {
    const res = await request(app).get("/items");
    console.log(res.body)
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(4);
    res.body.forEach((item) => {
      expect(item).toMatchObject({
        name: expect.any(String),
        quantity: expect.any(String),
        unit: expect.any(String),
        location: expect.any(String),
        category: expect.any(String),
        dateAdded: expect.any(String),
        expiryDate: expect.any(String),
        expiresSoon: expect.any(Boolean),
      });
    });
  });

  test.skip("POST /products creates a new product", async () => {
    const newProduct = {
      name: "bread",
      quantity: 1,
      unit: "pcs",
      location: "cupboard",
      category: "breadBakery",
      expiryDate: "2025-05-06",
    };

    const res = await request(app).post("/items").send(newProduct);
    console.log(res, " <<<<<<")
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe(newProduct.name);
  });
});

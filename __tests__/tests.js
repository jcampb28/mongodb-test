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
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("name");
  });

  test("POST /products creates a new product", async () => {
    const newProduct = {
      name: "Test Product",
      quantity: 10,
      unit: "pcs",
      category: "other",
      expiryDate: "2025-12-31"
    };

    const res = await request(app)
      .post("/products")
      .send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe(newProduct.name);
  });
});

const request = require("supertest");
const app = require("../server/app");

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

xdescribe("Inventory API (GET, POST)", () => {
  test("GET /items returns list of items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(4);
    res.body.forEach((item) => {
      expect(item).toMatchObject({
        name: expect.any(String),
        quantity: expect.any(Number),
        unit: expect.any(String),
        location: expect.any(String),
        category: expect.any(String),
        dateAdded: expect.any(String),
        expiryDate: expect.any(String),
        expiresSoon: expect.any(Boolean),
      });
    });
  });

  test("POST /items creates a new items", async () => {
    const newProduct = {
      name: "bread",
      quantity: 1,
      unit: "pcs",
      location: "cupboard",
      category: "breadBakery",
      expiryDate: "2025-05-06",
    };

    const res = await request(app).post("/items").send(newProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe(newProduct.name);
  });
});

describe("GET /api/users", () => {
    test("returns an array of users", async () => {
        const res = await request(app).get("/users")
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(3);
        res.body.forEach((item) => {
      expect(item).toMatchObject({
        name: expect.any(String),
        username: expect.any(String),
        emailAddress: expect.any(String),
        profilePicURL: expect.any(String),
        householdID: expect.any(String),
        allergies: expect.any(String),
        dietaryRequirements: expect.any(String),
        pantry: expect.any(Array),
      });
    });
    })
})

describe("POST /api/users", () => {
    test("add a user to the database", async () => {
      const newUser = {username:"Fridges", name:"Jack Smith", emailAddress:"email1@address.com",
    profilePicURL: "", householdID:"d5TFbn", allergies:"", dietaryRequirements:""}
        const res = await request(app).post("/users").send(newUser)
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("pantry");
        expect(res.body.name).toBe(newUser.name);
    
})
})
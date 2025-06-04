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

describe("GET /api/users", () => {
  test("returns an array of users", async () => {
    const res = await request(app).get("/users");
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
  });
});

describe("POST /api/users", () => {
  test("add a user to the database", async () => {
    const newUser = {
      username: "Fridges",
      name: "Jack Smith",
      emailAddress: "email1@address.com",
      profilePicURL: "",
      householdID: "d5TFbn",
      allergies: "",
      dietaryRequirements: "",
    };
    const res = await request(app).post("/users").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("pantry");
    expect(res.body.name).toBe(newUser.name);
  });
});

describe("GET /users/:username", () => {
  test("returns an object with a single user", async () => {
    const res = await request(app).get("/users/fridge1234");
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      name: expect.any(String),
      username: expect.any(String),
      emailAddress: expect.any(String),
      profilePicURL: expect.any(String),
      householdID: expect.any(String),
      allergies: expect.any(String),
      dietaryRequirements: expect.any(String),
      pantry: expect.any(Array),
      _id: expect.any(String),
    });
  }, 15000);
});

describe("GET /users/:username/pantry", () => {
  test("Should return an array containing all items the users owns", async () => {
    const res = await request(app).get("/users/fridge1234/pantry");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
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
  describe("GET /users/:username/pantry - filter", () => {
    test("Should return an array filtered only by the location specified", async () => {
      const res = await request(app).get(
        "/users/fridge1234/pantry?location=fridge"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      res.body.forEach((item) => {
        expect(item.location).toBe("fridge");
      });
    });
    test("Should return an empty array when no items are in the location specified", async () => {
      const res = await request(app).get(
        "/users/fridge1234/pantry?location=freezer"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
      expect(res.body).toEqual([]);
    });
    test("Should return an array filtered by the location and category specified", async () => {
      const res = await request(app).get(
        "/users/fridge1234/pantry?location=fridge&category=dairyEggs"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      res.body.forEach((item) => {
        expect(item.location).toBe("fridge");
        expect(item.category).toBe("dairyEggs");
      });
    });
    test("Should return an array filtered only by the category specified", async () => {
      const res = await request(app).get(
        "/users/fridge1234/pantry?category=dairyEggs"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      res.body.forEach((item) => {
        expect(item.category).toBe("dairyEggs");
      });
    });
    test("The default sorting of the pantry array should be earliest expiry date first", async () => {
      const res = await request(app).get(
        "/users/fridge1234/pantry?sortby=expiryDate"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body).toBeSortedBy("expiryDate");
    });
  });
});

describe("POST /users/:username/pantry", () => {
  test("adds a new item to the user's pantry array", async () => {
    const newItem = {
      name: "bread",
      quantity: 1,
      unit: "pcs",
      location: "cupboard",
      category: "breadBakery",
      expiryDate: "2025-05-06",
    };
    const res = await request(app)
      .post("/users/freezer5678/pantry")
      .send(newItem);
    expect(res.statusCode).toBe(201);
    expect(res.body[0]).toEqual({
      name: "bread",
      quantity: 1,
      unit: "pcs",
      location: "cupboard",
      category: "breadBakery",
      dateAdded: expect.any(String),
      expiryDate: expect.any(String),
      expiresSoon: expect.any(Boolean),
      _id: expect.any(String),
    });
  });
});

describe("PATCH /users/:username", () => {
  test("user can update their personal details", async () => {
    const patchedUser = {
      username: "tinned-tomato",
      name: "John",
      emailAddress: "email@address.com",
      allergies: "",
      dietaryRequirements: "pescatarian"
    };
    const res = await request(app).patch("/users/fridge1234").send(patchedUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      name: "John",
      username: "tinned-tomato",
      emailAddress: "email@address.com",
      profilePicURL: expect.any(String),
      householdID: "d5TFbn",
      allergies: "",
      dietaryRequirements: "pescatarian",
      pantry: expect.any(Array),
      _id: expect.any(String),
      __v: 0,
      dateAdded: expect.any(String)
    })
  })
})
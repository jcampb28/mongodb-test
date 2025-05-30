module.exports = {
    name: "bob",
    login: { username: "bob123", password: "secret" },
    inventory: {
      fridge: {
        dairy: [
          {
            name: "milk",
            qty: 1,
            unit: "pints",
            dateAdded: "2025-05-29",
            expiryDate: "2025-06-10",
            expiresSoon: false,
          },
          {
            name: "cheddar",
            qty: 500,
            unit: "g",
            dateAdded: "2025-05-29",
            expiryDate: "2025-07-10",
            expiresSoon: false,
          },
          {
            name: "double cream",
            qty: 200,
            unit: "ml",
            dateAdded: "2025-05-27",
            expiryDate: "2025-05-30",
            expiresSoon: true,
          },
        ],
        meatAndFish: [
          {
            name: "chicken thighs",
            qty: 5,
            unit: "items",
            dateAdded: "2025-05-29",
            expiryDate: "2025-05-30",
            expiresSoon: true,
          },
          {
            name: "ham slices",
            qty: 5,
            unit: "items",
            dateAdded: "2025-05-29",
            expiryDate: "2025-06-03",
            expiresSoon: false,
          },

        ],
        fruitAndVeg: [{
            name: "bananas",
            qty: 5,
            unit: "items",
            dateAdded: "2025-05-29",
            expiryDate: "2025-06-03",
            expiresSoon: false,
        }]
      },
      freezer: {
        dairy: [],
        meatAndFish: [
          {
            name: "fish fingers",
            qty: 10,
            unit: "items",
            dateAdded: "2025-05-29",
            expiryDate: "2025-10-10",
            expiresSoon: false,
          },
          {
            name: "salmon",
            qty: 500,
            unit: "g",
            dateAdded: "2025-05-29",
            expiryDate: "2025-07-10",
            expiresSoon: false,
          },
        ],
        other: []
      },
      cupboard: {
        snacks: [],
        herbs: [],
        other: []
      },
    },
};

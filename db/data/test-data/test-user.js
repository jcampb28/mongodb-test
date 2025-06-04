const { Item } = require("../../seed/item-schema");
const testItems = require("./test-item");

const testUsers = [
  {
    username: "fridge1234",
    name: "John Smith",
    emailAddress: "email@address.com",
    profilePicURL: "",
    householdID: "d5TFbn",
    allergies: "milk, peanuts",
    dietaryRequirements: "",
    pantry: [{name: "milk",
      _id: "6840310a69406f820b3c6bd0",
        quantity: 4,
        unit: "pints",
        location: "fridge",
        category: "dairyEggs",
        expiryDate: "2025-06-06",},
      {
        name: "flour",
        quantity: 750,
        unit: "g",
        location: "cupboard",
        category: "other",
        expiryDate: "2025-09-16",
    }, {
        name: "tomatoes",
        quantity: 7,
        unit: "pcs",
        location: "fridge",
        category: "fruitVeg",
        expiryDate: "2025-06-06",
    }],
  },
  {
    username: "freezer5678",
    name: "Jane Smith",
    emailAddress: "e-mail@address.com",
    profilePicURL: "",
    householdID: "f6yHHH",
    allergies: "",
    dietaryRequirements: "vegan",
    pantry: [],
  },
  {
    username: "cupboard31",
    name: "Prof Plum",
    emailAddress: "em-ail@address.com",
    profilePicURL: "",
    householdID: "9OPnnn",
    allergies: "shellfish",
    dietaryRequirements: "gluten free",
    pantry: [],
  },
];

module.exports = testUsers;

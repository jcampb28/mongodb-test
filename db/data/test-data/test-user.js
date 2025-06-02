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
    pantry: [],
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

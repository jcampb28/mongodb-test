const express = require("express");
const User = require("../../db/seed/user-schema");
const { Item } = require("../../db/seed/item-schema");
const { getUsers, postUser, getSingleUser, patchUser } = require("../controllers/usersController");
const { getPantry, getSingleItem, patchPantryItem, postItemToPantry, deleteItemFromPantry } = require("../controllers/pantryController");
const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.post("/", postUser);

usersRouter.get("/:username", getSingleUser);

usersRouter.get("/:username/pantry", getPantry);

usersRouter.get("/:username/pantry/:_id", getSingleItem)

usersRouter.post("/:username/pantry", postItemToPantry);

usersRouter.patch("/:username", patchUser);

usersRouter.patch("/:username/pantry/:_id", patchPantryItem);

usersRouter.delete("/:username/pantry/:_id", deleteItemFromPantry)
module.exports = usersRouter;

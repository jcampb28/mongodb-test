const User = require("../../db/seed/user-schema");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: "Failed to find users" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userName = req.params.username;
    const user = await User.findOne({ username: userName });
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "Failed to find users" });
  }
};

const postUser = async (req, res) => {
  try {
    const newUser = await User({ ...req.body });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    if (err._message === "User validation failed") {
      res.status(400).send({ msg: "Bad Request. User validation failed." });
    } else if (
      err.errorResponse.errmsg.startsWith("E11000 duplicate key error") &&
      err.errorResponse.errmsg.includes("username")
    ) {
      res
        .status(400)
        .send({ msg: "Bad Request. Username already exists in database." });
    } else if (
      err.errorResponse.errmsg.startsWith("E11000 duplicate key error") &&
      err.errorResponse.errmsg.includes("emailAddress")
    ) {
      res
        .status(400)
        .send({
          msg: "Bad Request. Email address already exists in database.",
        });
    } else {
      res.status(500).send({ error: "Failed to find users" });
    }
  }
};

const patchUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          username: req.body.username,
          name: req.body.name,
          emailAddress: req.body.emailAddress,
          allergies: req.body.allergies,
          dietaryRequirements: req.body.dietaryRequirements,
        },
      },
      { returnDocument: "after" }
    );
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = { getUsers, postUser, getSingleUser, patchUser };

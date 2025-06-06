const endpoints = require("../../endpoints.json")

const getEndpoints = (req, res) => {
    res.status(200).send({endpoints});
}

module.exports = {getEndpoints}
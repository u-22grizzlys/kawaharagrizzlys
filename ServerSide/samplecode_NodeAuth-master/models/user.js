var mongoose = require("mongoose");

var schema = mongoose.Schema({
    "id":       String,
    "email":    String,
    "name":     String,
    "password": String,
    "role":     String
});

module.exports = mongoose.model("User", schema, "user");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const credentialsSchema = new Schema({
    name: String,
    email: String,
    password: String
});

const documentSchema = new Schema({
    file: String,
});

const Credential = mongoose.model("authentication", credentialsSchema);
const Document = mongoose.model("document", documentSchema);

module.exports = {Document,Credential};
const mongoose = require("mongoose");

const models = require("../utils/modelName")
const { UserSchema } = require("./user")
const {VendorSchema}  = require("./vendor");
const { ClientSchema } = require("./client");

const dbModels = {
    User: mongoose.model(models.User, UserSchema),
    Vendor:mongoose.model(models.Vendor,VendorSchema),
    Client:mongoose.model(models.Client, ClientSchema),
}


module.exports = dbModels
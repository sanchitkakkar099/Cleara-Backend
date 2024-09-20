const helperUtils = require("../utils/helper")
const { ERROR_MSG, HttpStatus } = require("../utils/const");
const db = require("../utils/mongooseMethods")
const models = require("../utils/modelName")
const constants = require("../utils/const")
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createEditClient = async (req, res) => {
    try {
        if (!req?.body?._id) {
            let client = await db.findOne({ 
                collection: models.Client, 
                query: { email: req?.body?.email} 
            })
            if (client) {
                return res.status(HttpStatus.BAD_REQUEST)
                    .send(helperUtils.error("Email Already Exists", {}))
            }
            let newClient = await db.insertOne({
                collection: models.Client,
                document: req.body
            })
            return res.status(HttpStatus.OK)
                .send(helperUtils.success('Client created', newClient));
        } else {
            let client = await db.findOne({
                collection: models.Client,
                query: { _id: req.body._id }
            });
            if (!client) {
                return res.status(HttpStatus.BAD_REQUEST)
                    .send(helperUtils.error("Client Not Found", {}))
            }
            await db.updateOne({
                collection: models.Client,
                query: { _id: req.body._id },
                update: req.body,
            })
            return res.status(HttpStatus.OK)
                .send(helperUtils.success('Client updated',{}));
        }
    } catch (error) {
        helperUtils.errorRes(res, "Internal Server Error", {}, 400)
        return
    }
}
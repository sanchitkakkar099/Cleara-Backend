const mongoose = require("mongoose")
const mongoosepaginate = require("mongoose-paginate-v2")

const ClientSchema = new mongoose.Schema({
    companyName: { type: String },
    parentCompany: { type: String },
    inquiryName: { type: String },
    substitute: {type:String},
    clintCode: { type: String },
    date: { type: String },
    name: { type: String },
    email: { type: String },
    clientphone: { type: String },
    clientEXT: { type: String },
    altClientphone: { type: String },
    altClientEXT: { type: String },
    faxNumber: { type: String },
    faxInstruction: { type: String },
    ownername: { type: String },
    ownerphone: { type: String },
    ownerEXT: { type: String },
    owneremail: { type: String },
    status: { type: String },
    disabledMessage: { type: String },
    disabledReason: { type: String },
    physical_address: {
        street: { type: String },
        addressLine2: { type: String },
        zip: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
    },
    billing_address: {
        street: { type: String },
        addressLine2: { type: String },
        zip: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
    },
    Altclientphone: { type: String },
    displayProductSection: { type: Boolean, default:false },
    productSection: { type: String },
    affiliated: { type: String },
    invoice: { type: Boolean, default:false },
    isDel: { type: Boolean, default: false }
}, { timestamps: true, strict: true })

ClientSchema.plugin(mongoosepaginate);

exports.ClientSchema = ClientSchema;
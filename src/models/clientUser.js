const mongoose = require("mongoose")
const mongoosepaginate = require("mongoose-paginate-v2")

const ClientUserSchema = new mongoose.Schema(
    {
        userfirstname: { type: String },
        userlastname: { type: String },
        jobtitle: { type: String },
        userphone: { type: String },
        userphoneExt: { type: String},
        userAltphone: { type: String },
        userAltphoneEXT: { type: String},
        userfaxNumber: { type: String },
        userfaxInstruction: { type: String},
        userNote: { type: String },
        loginType: { type: String},
        email: {type:String},
        username: { type: String },
        builtInpassword: {type:String},
        newaccount: { type: Boolean},
        newpassword: { type: String }, 
        confirmpassword: { type: String},
        changepassword: { type: Boolean, default: false},
        userStatus: { type: String },
        disableMessage: { type: String },
        disableReason: { type: String},
        usersiplist: { type: String },
        disableMFA: { type: Boolean, default: false },
        MFAphone: { type: String },
        isDel: { type: Boolean, default: false }
    }, { timestamps: true, strict: true })


    ClientUserSchema.plugin(mongoosepaginate);
    exports.ClientUserSchema = ClientUserSchema;


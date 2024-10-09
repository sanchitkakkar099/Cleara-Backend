const helperUtils = require("../utils/helper");
const { ERROR_MSG } = require("../utils/const");
const db = require("../utils/mongooseMethods");
const models = require("../utils/modelName");
const constants = require("../utils/const");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generatePassword } = require("../services/generatePassword");
const emailsend = require("../services/emailService");

exports.createEditClientUser = async (req, res) => {
  try {
    // console.log("clientUser payload", req?.body);
    if (!req?.body?._id) {
      let clientUser = await db.findOne({
        collection: models.ClientUser,
        query: { email: req?.body?.email },
      });
      if (clientUser) {
        console.log("data with email already exist");
        return res.send(
          helperUtils.error("ClientUser with same Email Already Exists", {})
        );
      }

      let inbuild_password;
      // let newpassword;
      // let confirmpassword;
      const salt = await bycrypt.genSalt(10);
      if (req?.body?.newaccount) {
        inbuild_password = generatePassword();
        req.body.builtInpassword = await bycrypt.hash(inbuild_password, salt);
        console.log("inbuild_password", inbuild_password);
      } else {
        req.body.newpassword = await bycrypt.hash(req.body.newpassword, salt);
        req.body.confirmpassword = await bycrypt.hash(
          req.body.confirmpassword,
          salt
        );
      }

      console.log("payload for server", req?.body);
      let newClientUser = await db.insertOne({
        collection: models.ClientUser,
        document: req.body,
      });


      /***** send email,inbuilt password on user email  *****/

      if(req?.body?.newaccount) {
  console.log("inbuild_password",inbuild_password);
      const htmlContentUser = `
      <p>Hi, ${req?.body?.userfirstname}</p>
      <p>We are pleased to inform you that your account has been successfully created for the Background Screening Portal. You can now log in and begin managing your screening requests.</p>
      <p>Here are your account details:</p>
      <p>Email: ${req?.body?.email}</p>
      <p>Password: ${inbuild_password}</p>
      <p>If you encounter any issues during login or have questions, feel free to reach out to us.</p>
      <p>We look forward to assisting you with your background screening needs.<p/>
      <p>Best regards,</p>
     `;

     let emailUser = await emailsend.sendEmail(
      req?.body?.email,
      "Account Setup Successfuly ",
      htmlContentUser
    );
      }
      return res.send(helperUtils.success("ClientUser created", newClientUser));
    } else {
      let clientUser = await db.findOne({
        collection: models.ClientUser,
        query: { _id: req.body._id },
      });
      if (!clientUser) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(helperUtils.error("ClientUser Not Found", {}));
      }
      await db.updateOne({
        collection: models.ClientUser,
        query: { _id: req.body._id },
        update: req.body,
      });
      return res
        .status(HttpStatus.OK)
        .send(helperUtils.success("ClientUser updated", {}));
    }
  } catch (error) {
    helperUtils.errorRes(res, "Internal Server Error", {}, 400);
    return;
  }
};


exports.clientUserList = async (req, res) => {
  try {
      let query = {isDel: false}
      if (req.body.search) {
          query.$or = [
            { userphone: { $regex: req.body.search, $options: 'i' } },
            { email: { $regex: req.body.search, $options: 'i' } }
          ];
        }
      let result = await db.paginate({
          collection: models.ClientUser,
          query: query,
          options: {
              page: (req.body.page) ? req.body.page : 1,
              limit: (req.body.limit) ? req.body.limit : 10,
              sort: { _id: 1 }
          }
      })
      res.send(helperUtils.success("Get Client list Successfully", result));
      return
  } catch (error) {
      res.send(helperUtils.error(ERROR_MSG, error.message));
      return;
  }
}
const helperUtils = require("../utils/helper");
const { ERROR_MSG, HttpStatus } = require("../utils/const");
const db = require("../utils/mongooseMethods");
const models = require("../utils/modelName");

exports.createEditClient = async (req, res) => {
  try {
    console.log("client payload", req?.body);
    if (!req?.body?._id) {
      let client = await db.findOne({
        collection: models.Client,
        query: { email: req?.body?.email },
      });
      if (client) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(helperUtils.error("Client with same Email Already Exists", {}));
      }
      let newClient = await db.insertOne({
        collection: models.Client,
        document: req.body,
      });
      return res
        .status(HttpStatus.OK)
        .send(helperUtils.success("Client created", newClient));
    } else {
      let client = await db.findOne({
        collection: models.Client,
        query: { _id: req.body._id },
      });
      if (!client) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(helperUtils.error("Client Not Found", {}));
      }
      await db.updateOne({
        collection: models.Client,
        query: { _id: req.body._id },
        update: req.body,
      });
      return res
        .status(HttpStatus.OK)
        .send(helperUtils.success("Client updated", {}));
    }
  } catch (error) {
    helperUtils.errorRes(res, "Internal Server Error", {}, 400);
    return;
  }
};

exports.clientList = async (req, res) => {
    try {
        let query = {isDel: false}
        if (req.body.search) {
            query.$or = [
              { companyName: { $regex: req.body.search, $options: 'i' } },
              { email: { $regex: req.body.search, $options: 'i' } }
            ];
          }
        let result = await db.paginate({
            collection: models.Client,
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

exports.deleteClient = async (req, res) => {
    console.log("Client is not defined",res)
    try {
        let client = await db.findOne({
            collection: models.Client,
            query: { _id: req.params.id }
        });
        if (!client) {
            res.send(helperUtils.error("Client Not Found", {}));
            return;
        }
        await db.deleteOne({
            collection: models.Client,
            query: { _id: req.params.id },

        })
        res.send(helperUtils.success("Client deleted successfully", {}));
        return
    } catch (error) {
        return res.send(helperUtils.error(ERROR_MSG, error.message));

    }
}

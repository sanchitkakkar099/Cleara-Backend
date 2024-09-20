const router = require("express").Router();
const clientController = require("../controllers/client.controller");
const ClientSchema = require("../validators/clientSchema");
const validator = require("../middleware/validator");



router.post('/', 
    // validator('body', ClientSchema.createEditCient),
    clientController.createEditClient
);

module.exports = router;
const router = require("express").Router();
const clientController = require("../controllers/client.controller");
const {auth} = require("../middleware/auth")

router.post('/',auth,clientController.createEditClient);
router.post('/list',auth,clientController.clientList);
router.delete("/:id",auth, clientController.deleteClient);

module.exports = router;
const router = require("express").Router();
const clientuserController = require("../controllers/clientusers.controller")
const {auth} = require("../middleware/auth")


router.post('/',auth,clientuserController.createEditClientUser);
router.post('/list',auth,clientuserController.clientUserList);
// router.delete("/:id",auth, ClientUserController.deleteClient);

module.exports = router;
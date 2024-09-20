const router = require("express").Router();
const adminroutes = require("./admin");
const vendoRoutes = require("./vendor");
const clientRoutes = require("./client");

router.use("/admin", adminroutes);
router.use("/vendor", vendoRoutes);
router.use("/client", clientRoutes);

module.exports = router;
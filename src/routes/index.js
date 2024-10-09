const router = require("express").Router();
const adminroutes = require("./admin");
const vendoRoutes = require("./vendor");
const clientRoutes = require("./client");
const clienteuserRoutes = require("./clientUser");
router.use("/admin", adminroutes);
router.use("/vendor", vendoRoutes);
router.use("/client", clientRoutes);
router.use("/clientuser", clienteuserRoutes);

module.exports = router;
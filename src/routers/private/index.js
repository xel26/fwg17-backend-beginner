const privateRouter = require("express").Router();

const checkoutController = require("../../controllers/checkout.controller")

privateRouter.use("/profile", require("./profile.router"))
privateRouter.use("/hitory-order", require("./historyOrder.router"))
privateRouter.post("/checkout", checkoutController.createOrder);

module.exports = privateRouter
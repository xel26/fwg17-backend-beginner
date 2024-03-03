const historyOrderRouter = require("express").Router();

const orderController = require("../../controllers/admin/order.controller");
const checkoutController = require("../../controllers/checkout.controller");

historyOrderRouter.get("/", orderController.getAllOrders);
historyOrderRouter.get("/:id", orderController.getDetailOrder);
historyOrderRouter.get("/products", checkoutController.getOrderProducts);

module.exports = historyOrderRouter;
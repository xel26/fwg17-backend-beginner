const historyOrderRouter = require("express").Router();

const historyOrderController = require("../../controllers/historyOrder.controller");

historyOrderRouter.get("/", historyOrderController.getAllHistoryOrder);
historyOrderRouter.get("/products", historyOrderController.getHistoryOrderProducts);
historyOrderRouter.get("/:id", historyOrderController.getDetailHistoryOrder);

module.exports = historyOrderRouter;
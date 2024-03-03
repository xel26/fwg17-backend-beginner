const orderDetail = require("express").Router();

const orderDetailController = require("../../controllers/admin/orderDetails.controller");

orderDetail.get("/", orderDetailController.getAllOrderDetail);
orderDetail.get("/:id", orderDetailController.getDetailOrderDetail);
orderDetail.post("/", orderDetailController.createOrderDetail);
orderDetail.patch("/:id", orderDetailController.updateOrderDetail);
orderDetail.delete("/:id", orderDetailController.deleteOrderDetail);

module.exports = orderDetail;
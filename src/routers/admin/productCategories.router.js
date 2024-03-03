const pcRouter = require("express").Router();

const pcController = require("../../controllers/admin/productCategories.controller");

pcRouter.get("/", pcController.getAllProductCategories);
pcRouter.get("/:id", pcController.getDetailProductCategories);
pcRouter.post("/", pcController.createProductCategories);
pcRouter.patch("/:id", pcController.updateProductCategories);
pcRouter.delete("/:id", pcController.deleteProductCategories);

module.exports = pcRouter;